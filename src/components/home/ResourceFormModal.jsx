import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Gift, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ResourceFormModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    clinicName: '',
    clinicType: '',
    cityState: '',
    monthlyBudget: '',
    monthlyPatients: '',
    biggestChallenge: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Vercel API Proxy (which forwards to GHL)
      const response = await fetch('/api/ghl-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (onSubmit) {
        onSubmit(formData);
      }

      // Trigger Native Research Engine (fire-and-forget)
      fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Home Page Free Resources' }),
        keepalive: true,
      }).catch(err => console.error("Research trigger error", err));

      // Queue for deep dashboard generation (NotebookLM via local listener)
      fetch('https://yrfobzuiqcuhylstiukn.supabase.co/functions/v1/queue-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinic_name: formData.clinicName || `${formData.firstName} ${formData.lastName}`.trim(),
          clinic_domain: formData.website,
          services: [formData.clinicType],
          city_state: formData.cityState || '',
          contact_name: `${formData.firstName} ${formData.lastName}`.trim(),
          contact_email: formData.email,
          monthly_budget: formData.monthlyBudget,
          team_structure: '',
        }),
        keepalive: true,
      }).catch(err => console.error("Dashboard queue error", err));

    } catch (error) {
      console.error('Error submitting form:', error);
      // Optional: Show user error feedback here
    }

    // Generate unique event_id for deduplication between client pixel and server CAPI
    const eventId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);

    // Helper to read cookies
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : '';
    };

    // Track Facebook event - Lead (client-side pixel with eventID for deduplication)
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead', {
        content_name: 'Resource Form Submission',
        content_category: 'Lead',
        status: 'completed',
        value: 0.00,
        currency: 'USD'
      }, { eventID: eventId });
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'Resource Form Submission',
        status: 'completed'
      });
    }

    // Server-side CAPI — bypasses Facebook's data sharing restrictions
    const capiBase = {
      event_name: 'Lead',
      event_id: eventId,
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fbc: getCookie('_fbc'),
      fbp: getCookie('_fbp'),
      client_ua: navigator.userAgent,
      event_source_url: window.location.href,
      content_name: 'Resource Form Submission',
      content_category: 'Lead',
      value: 0,
      currency: 'USD',
    };

    // CAPI → existing pixel (822229636864741)
    try {
      await fetch('/api/fb-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiBase),
      });
    } catch (err) {
      console.error('CAPI (existing pixel) error:', err);
    }

    // CAPI → qualified pixel (1864098504252459)
    try {
      await fetch('/api/fb-capi-qualified', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiBase),
      });
    } catch (err) {
      console.error('CAPI (qualified pixel) error:', err);
    }

    setIsSubmitting(false);

    // Redirect to Thank You page
    window.location.href = '/ThankYou';
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      clinicName: '',
      clinicType: '',
      cityState: '',
      monthlyBudget: '',
      monthlyPatients: '',
      biggestChallenge: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={resetAndClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Get Free Resources</h2>
                <p className="text-sm text-gray-500">Step {step} of 3</p>
              </div>
            </div>
            <button onClick={resetAndClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
              ></div>
            </div>
          </div>

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Where should we send your resources?</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <Input
                      value={formData.firstName}
                      onChange={e => handleChange('firstName', e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <Input
                      value={formData.lastName}
                      onChange={e => handleChange('lastName', e.target.value)}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="john@clinic.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Website *</label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={e => handleChange('website', e.target.value)}
                    placeholder="https://yourclinic.com"
                    required
                  />
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.website}
                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold"
              >
                Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Clinic Info */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tell us about your clinic</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name *</label>
                  <Input
                    value={formData.clinicName}
                    onChange={e => handleChange('clinicName', e.target.value)}
                    placeholder="Your Clinic Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City &amp; State *</label>
                  <Input
                    value={formData.cityState}
                    onChange={e => handleChange('cityState', e.target.value)}
                    placeholder="e.g. Austin, TX"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Marketing Budget</label>
                  <Select value={formData.monthlyBudget} onValueChange={value => handleChange('monthlyBudget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-2k">Under $2,000 / mo</SelectItem>
                      <SelectItem value="2k-5k">$2,000 – $5,000 / mo</SelectItem>
                      <SelectItem value="5k-10k">$5,000 – $10,000 / mo</SelectItem>
                      <SelectItem value="10k-20k">$10,000 – $20,000 / mo</SelectItem>
                      <SelectItem value="20k+">$20,000+ / mo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Clinic *</label>
                  <Select value={formData.clinicType} onValueChange={value => handleChange('clinicType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select clinic type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tms">TMS Clinic</SelectItem>
                      <SelectItem value="ketamine">Ketamine Clinic</SelectItem>
                      <SelectItem value="spravato">Spravato Clinic</SelectItem>
                      <SelectItem value="multi">Multiple Treatments</SelectItem>
                      <SelectItem value="other">Other Mental Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly New Patients</label>
                  <Select value={formData.monthlyPatients} onValueChange={value => handleChange('monthlyPatients', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10">0-10 patients</SelectItem>
                      <SelectItem value="10-25">10-25 patients</SelectItem>
                      <SelectItem value="25-50">25-50 patients</SelectItem>
                      <SelectItem value="50+">50+ patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biggest Marketing Challenge</label>
                  <Select value={formData.biggestChallenge} onValueChange={value => handleChange('biggestChallenge', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leads">Not enough leads</SelectItem>
                      <SelectItem value="quality">Low quality leads</SelectItem>
                      <SelectItem value="cost">High cost per patient</SelectItem>
                      <SelectItem value="conversion">Low conversion rate</SelectItem>
                      <SelectItem value="awareness">Lack of brand awareness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!formData.clinicName || !formData.clinicType || isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Free Resources
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">You're All Set!</h3>
              <p className="text-gray-600 mb-6">
                Check your email for your free resources. We've sent you our best strategies for growing your {formData.clinicType === 'tms' ? 'TMS' : formData.clinicType === 'ketamine' ? 'Ketamine' : formData.clinicType === 'spravato' ? 'Spravato' : 'mental health'} clinic.
              </p>
              <div className="bg-teal-50 rounded-xl p-4 mb-6">
                <p className="text-teal-800 font-medium">
                  Want to accelerate your growth even faster?
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold"
                onClick={resetAndClose}
              >
                Book a Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button
                onClick={resetAndClose}
                className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                Close this window
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}