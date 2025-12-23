import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Download, CheckCircle } from 'lucide-react';

export default function ExportHTML() {
  const [copied, setCopied] = useState(false);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LivForMor Media - Mental Health Clinic Marketing Experts | TMS, Ketamine, Spravato</title>
    <meta name="description" content="Specialized marketing agency for mental health clinics. We help TMS, Ketamine, Spravato, and Psychedelic therapy clinics attract high-quality patients through proven strategies.">
    <meta name="keywords" content="TMS marketing, ketamine clinic marketing, spravato marketing, psychedelic therapy marketing, mental health clinic advertising, patient acquisition, clinic growth">
    <meta name="author" content="LivForMor Media">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://livformor.com">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="LivForMor Media - Mental Health Clinic Marketing Experts">
    <meta property="og:description" content="Specialized marketing for TMS, Ketamine, Spravato & Psychedelic Therapy clinics. Proven patient acquisition strategies.">
    <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png">
    <meta property="og:url" content="https://livformor.com">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="LivForMor Media - Mental Health Clinic Marketing">
    <meta name="twitter:description" content="Specialized marketing for TMS, Ketamine, Spravato & Psychedelic Therapy clinics.">
    <meta name="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Nunito Sans', sans-serif;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            overflow-x: hidden;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(229, 231, 235, 1);
        }

        .nav-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
        }

        .nav-logo img {
            height: 64px;
            width: auto;
        }

        .nav-links {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }

        .nav-link {
            color: #374151;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
            transition: color 0.2s;
            position: relative;
        }

        .nav-link:hover {
            color: #0f766e;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: #0f766e;
            transition: width 0.3s;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        .btn-primary {
            background: linear-gradient(to right, #0f766e, #1e40af);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s;
            font-size: 1rem;
        }

        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }

        .mobile-menu {
            display: none;
            background: white;
            border-top: 1px solid #e5e7eb;
            padding: 1rem 0;
        }

        .mobile-menu.active {
            display: block;
        }

        .mobile-menu a {
            display: block;
            padding: 0.75rem 1.5rem;
            color: #374151;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
        }

        .mobile-menu a:hover {
            background: #f9fafb;
            color: #0f766e;
        }

        @media (max-width: 1024px) {
            .nav-links {
                display: none;
            }
            .mobile-menu-btn {
                display: block;
            }
        }

        /* Hero Section */
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 6rem 1.5rem 4rem;
        }

        .hero-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }

        .animated-bg {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.3;
            animation: float 20s infinite;
        }

        .bg-1 {
            width: 600px;
            height: 600px;
            background: linear-gradient(135deg, #0f766e, #14b8a6);
            top: -200px;
            left: -200px;
            animation-delay: 0s;
        }

        .bg-2 {
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            bottom: -150px;
            right: -150px;
            animation-delay: 7s;
        }

        .bg-3 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: 14s;
        }

        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            33% {
                transform: translate(50px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-50px, 50px) scale(0.9);
            }
        }

        .hero-content {
            position: relative;
            z-index: 10;
            max-width: 1280px;
            text-align: center;
            color: white;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: rgba(20, 184, 166, 0.2);
            border: 1px solid rgba(20, 184, 166, 0.3);
            border-radius: 9999px;
            color: #5eead4;
            font-weight: 500;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
        }

        .hero-gradient-text {
            background: linear-gradient(to right, #5eead4, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-stats {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 3rem;
            flex-wrap: wrap;
        }

        .stat {
            text-align: center;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(to right, #5eead4, #60a5fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .stat-label {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.875rem;
            margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            .hero p {
                font-size: 1rem;
            }
            .stat-value {
                font-size: 1.75rem;
            }
        }

        /* Section Styles */
        .section {
            padding: 6rem 1.5rem;
        }

        .section-container {
            max-width: 1280px;
            margin: 0 auto;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.5rem 1rem;
            background: linear-gradient(to right, rgba(240, 253, 250, 1), rgba(239, 246, 255, 1));
            border: 1px solid rgba(204, 251, 241, 1);
            border-radius: 9999px;
            color: #0f766e;
            font-weight: 500;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
        }

        .section-title {
            font-size: 3rem;
            font-weight: 800;
            color: #111827;
            margin-bottom: 1.5rem;
        }

        .section-title .gradient-text {
            background: linear-gradient(to right, #0f766e, #1e40af);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .section-description {
            font-size: 1.25rem;
            color: #6b7280;
            max-width: 768px;
            margin: 0 auto;
        }

        /* Free Resources CTA */
        .cta-box {
            background: linear-gradient(135deg, #0f766e, #1e40af);
            padding: 4rem 2rem;
            border-radius: 1.5rem;
            text-align: center;
            color: white;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .cta-box h2 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }

        .cta-box p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }

        .cta-benefits {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
            text-align: left;
        }

        .benefit-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }

        .benefit-icon {
            width: 24px;
            height: 24px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 0.25rem;
        }

        /* YouTube Section */
        .youtube-section {
            background: #111827;
            color: white;
        }

        .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            max-width: 900px;
            margin: 0 auto 2.5rem;
        }

        .video-card {
            background: #1f2937;
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid #374151;
            cursor: pointer;
            transition: all 0.3s;
        }

        .video-card:hover {
            border-color: #4b5563;
            transform: translateY(-4px);
        }

        .video-thumbnail {
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
        }

        .video-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .video-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }

        .video-card:hover .video-overlay {
            background: rgba(0, 0, 0, 0.4);
        }

        .play-button {
            width: 56px;
            height: 56px;
            background: #dc2626;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s;
        }

        .video-card:hover .play-button {
            transform: scale(1.1);
        }

        .video-info {
            padding: 1.25rem;
        }

        .video-title {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .video-description {
            color: #9ca3af;
            font-size: 0.875rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* C.A.R.E. Framework */
        .care-steps {
            max-width: 1024px;
            margin: 0 auto;
        }

        .care-step {
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            overflow: hidden;
            background: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s;
            margin-bottom: 1rem;
        }

        .care-step:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .care-step-header {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            background: white;
        }

        .care-step-title-wrapper {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .care-icon {
            width: 56px;
            height: 56px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .care-icon.purple {
            background: linear-gradient(to right, #a855f7, #4f46e5);
        }

        .care-icon.blue {
            background: linear-gradient(to right, #3b82f6, #06b6d4);
        }

        .care-icon.green {
            background: linear-gradient(to right, #10b981, #0f766e);
        }

        .care-icon.orange {
            background: linear-gradient(to right, #f97316, #dc2626);
        }

        .care-step-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
        }

        .care-letter {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .care-letter.purple { color: #a855f7; }
        .care-letter.blue { color: #3b82f6; }
        .care-letter.green { color: #10b981; }
        .care-letter.orange { color: #f97316; }

        .care-subtitle {
            color: #6b7280;
            font-size: 1rem;
        }

        .chevron {
            width: 24px;
            height: 24px;
            transition: transform 0.3s;
        }

        .care-step.active .chevron {
            transform: rotate(180deg);
        }

        .care-step-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .care-step.active .care-step-content {
            max-height: 1000px;
        }

        .care-step-body {
            padding: 0 1.5rem 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .care-benefits {
            margin-top: 1.5rem;
        }

        .care-benefit {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: #374151;
        }

        .care-results {
            background: #f9fafb;
            padding: 1.5rem;
            border-radius: 0.75rem;
        }

        .care-results h4 {
            font-weight: 700;
            color: #111827;
            margin-bottom: 1rem;
        }

        .result-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .result-label {
            color: #6b7280;
        }

        .result-value {
            font-weight: 700;
            font-size: 1.125rem;
        }

        .result-value.purple { color: #a855f7; }
        .result-value.blue { color: #3b82f6; }
        .result-value.green { color: #10b981; }
        .result-value.orange { color: #f97316; }

        @media (max-width: 768px) {
            .care-step-body {
                grid-template-columns: 1fr;
            }
        }

        /* Why Choose Us */
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .benefit-card {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border: 1px solid #f3f4f6;
            transition: all 0.3s;
        }

        .benefit-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .benefit-card-icon {
            width: 64px;
            height: 64px;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }

        .benefit-card-icon.blue {
            background: linear-gradient(to right, #3b82f6, #06b6d4);
        }

        .benefit-card-icon.purple {
            background: linear-gradient(to right, #a855f7, #4f46e5);
        }

        .benefit-card-icon.green {
            background: linear-gradient(to right, #10b981, #0f766e);
        }

        .benefit-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1rem;
        }

        .benefit-card p {
            color: #6b7280;
            line-height: 1.6;
        }

        .features-box {
            background: white;
            padding: 3rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border: 1px solid #f3f4f6;
            max-width: 1280px;
            margin: 0 auto;
        }

        .features-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .features-text h3 {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
        }

        .features-text p {
            font-size: 1.125rem;
            color: #6b7280;
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .features-list {
            display: grid;
            gap: 1rem;
        }

        .feature-item {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .feature-item svg {
            color: #10b981;
            flex-shrink: 0;
        }

        .features-cta {
            background: linear-gradient(135deg, #0f766e, #1e40af);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .features-cta-inner {
            background: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            text-align: center;
        }

        .features-cta h4 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1rem;
        }

        .features-cta p {
            color: #6b7280;
            margin-bottom: 1.5rem;
        }

        .cta-features {
            text-align: left;
        }

        .cta-feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }

        @media (max-width: 1024px) {
            .features-content {
                grid-template-columns: 1fr;
            }
        }

        /* Founder Section */

        .founder-card {
            background: linear-gradient(135deg, #f9fafb, white);
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border: 1px solid #f3f4f6;
            text-align: center;
        }

        .founder-avatar {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto 1.5rem;
        }

        .founder-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .founder-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .founder-role {
            color: #0f766e;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .founder-specialty {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
        }

        .founder-bio {
            color: #6b7280;
            line-height: 1.6;
        }

        .mission-box {
            background: linear-gradient(135deg, rgba(240, 253, 250, 1), rgba(239, 246, 255, 1));
            padding: 3rem;
            border-radius: 1.5rem;
            border: 1px solid rgba(204, 251, 241, 1);
            max-width: 1024px;
            margin: 0 auto 3rem;
            text-align: center;
        }

        .mission-box h3 {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
        }

        .mission-box p {
            font-size: 1.25rem;
            color: #374151;
            line-height: 1.7;
            margin-bottom: 2rem;
        }

        .mission-signature {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 2rem;
        }

        .mission-line {
            width: 64px;
            height: 2px;
            background: linear-gradient(to right, #0f766e, #1e40af);
            border-radius: 9999px;
        }

        .mission-authors {
            color: #6b7280;
            font-weight: 500;
        }

        /* FAQ Section */
        .faq-list {
            max-width: 900px;
            margin: 0 auto 4rem;
        }

        .faq-item {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 1rem;
            margin-bottom: 1rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .faq-question {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            background: white;
            border: none;
            width: 100%;
            text-align: left;
            font-size: 1.125rem;
            font-weight: 700;
            color: #111827;
        }

        .faq-question:hover {
            background: #f9fafb;
        }

        .faq-chevron {
            width: 20px;
            height: 20px;
            transition: transform 0.3s;
            flex-shrink: 0;
        }

        .faq-item.active .faq-chevron {
            transform: rotate(180deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .faq-item.active .faq-answer {
            max-height: 500px;
        }

        .faq-answer-content {
            padding: 0 1.5rem 1.5rem;
            color: #6b7280;
            line-height: 1.7;
        }

        .faq-cta {
            background: linear-gradient(135deg, rgba(240, 253, 250, 1), rgba(239, 246, 255, 1));
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            border: 1px solid rgba(204, 251, 241, 1);
        }

        .faq-cta h3 {
            font-size: 1.75rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .faq-cta p {
            color: #6b7280;
            margin-bottom: 1.5rem;
        }

        /* Footer */
        .footer {
            background: #111827;
            color: white;
            padding: 4rem 1.5rem 2rem;
        }

        .footer-content {
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-section h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .footer-section p,
        .footer-section a {
            color: #9ca3af;
            text-decoration: none;
            display: block;
            margin-bottom: 0.5rem;
            transition: color 0.2s;
        }

        .footer-section a:hover {
            color: white;
        }

        .footer-bottom {
            max-width: 1280px;
            margin: 0 auto;
            padding-top: 2rem;
            border-top: 1px solid #374151;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .footer-links {
            display: flex;
            gap: 1.5rem;
        }

        .footer-links a {
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.2s;
        }

        .footer-links a:hover {
            color: white;
        }

        /* Modal */
        .modal-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal-overlay.active {
            display: flex;
        }

        .modal {
            background: white;
            border-radius: 1.5rem;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .modal-header {
            padding: 2rem 2rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
        }

        .modal-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: #6b7280;
            transition: color 0.2s;
        }

        .modal-close:hover {
            color: #111827;
        }

        .modal-body {
            padding: 0 2rem 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
        }

        .form-input,
        .form-select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            font-size: 1rem;
            transition: all 0.2s;
        }

        .form-input:focus,
        .form-select:focus {
            outline: none;
            border-color: #0f766e;
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
        }

        .form-buttons {
            display: flex;
            gap: 0.75rem;
            margin-top: 2rem;
        }

        .btn-secondary {
            flex: 1;
            padding: 0.75rem 1.5rem;
            border: 1px solid #d1d5db;
            background: white;
            color: #374151;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-secondary:hover {
            background: #f9fafb;
        }

        .btn-submit {
            flex: 1;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(to right, #0f766e, #1e40af);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-submit:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .success-message {
            text-align: center;
            padding: 2rem;
        }

        .success-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            border-radius: 50%;
            background: linear-gradient(135deg, #10b981, #0f766e);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .success-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
        }

        .success-text {
            color: #6b7280;
            margin-bottom: 1.5rem;
        }

        .step-indicators {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }

        .step-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #d1d5db;
            transition: all 0.3s;
        }

        .step-dot.active {
            width: 24px;
            border-radius: 4px;
            background: linear-gradient(to right, #0f766e, #1e40af);
        }

        /* Floating CTA */
        .floating-cta {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 999;
            animation: fadeInUp 0.5s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .floating-btn {
            background: linear-gradient(to right, #0f766e, #1e40af);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 9999px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .floating-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 640px) {
            .floating-cta {
                bottom: 1rem;
                right: 1rem;
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .section-title {
                font-size: 2rem;
            }
            .section-description {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav" id="nav">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/b6fc53ddd_LivForMorMediaLogo.png" alt="LivForMor Media">
            </div>
            <div class="nav-links">
                <a href="#home" class="nav-link">Home</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#care" class="nav-link">The C.A.R.E. Framework</a>
                <a href="#youtube" class="nav-link">YouTube</a>
            </div>
            <button class="btn-primary" onclick="openModal()">Get Free Resources</button>
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="mobile-menu" id="mobileMenu">
            <a href="#home" onclick="closeMobileMenu()">Home</a>
            <a href="#about" onclick="closeMobileMenu()">About</a>
            <a href="#care" onclick="closeMobileMenu()">The C.A.R.E. Framework</a>
            <a href="#youtube" onclick="closeMobileMenu()">YouTube</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-bg">
            <div class="animated-bg bg-1"></div>
            <div class="animated-bg bg-2"></div>
            <div class="animated-bg bg-3"></div>
        </div>
        <div class="hero-content">
            <div class="hero-badge">
                🎯 Specialized in Mental Health Clinic Marketing
            </div>
            <h1>
                Turn Your Mental Health Clinic Into a<br>
                <span class="hero-gradient-text">Patient Magnet</span>
            </h1>
            <p>
                We help Ketamine, TMS, Spravato & Psychedelic Therapy clinics attract high-quality patients through proven marketing strategies
            </p>
            <button class="btn-primary" onclick="openModal()">Get Free Resources</button>
            <div class="hero-stats">
                <div class="stat">
                    <div class="stat-value">$500K+</div>
                    <div class="stat-label">In Ad Spend Managed</div>
                </div>
                <div class="stat">
                    <div class="stat-value">6 Years</div>
                    <div class="stat-label">Marketing Experience</div>
                </div>
                <div class="stat">
                    <div class="stat-value">3-5X</div>
                    <div class="stat-label">Average ROI for Clients</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Free Resources CTA -->
    <section class="section" style="background: linear-gradient(135deg, #f9fafb, white);">
        <div class="section-container">
            <div class="cta-box">
                <h2>Get Your FREE Growth Resources</h2>
                <p>Tailored specifically for your clinic type and stage</p>
                <div class="cta-benefits">
                    <div class="benefit-item">
                        <div class="benefit-icon">✓</div>
                        <span>Patient Acquisition Checklists</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">✓</div>
                        <span>Ad Campaign Templates</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">✓</div>
                        <span>ROI Calculators & Tools</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon">✓</div>
                        <span>Free Strategy Consultation</span>
                    </div>
                </div>
                <button class="btn-primary" onclick="openModal()">Claim Your Free Resources</button>
            </div>
        </div>
    </section>

    <!-- YouTube Section -->
    <section class="section youtube-section" id="youtube">
        <div class="section-container">
            <div class="section-header">
                <div class="section-badge" style="background: rgba(220, 38, 38, 0.2); border-color: rgba(220, 38, 38, 0.3); color: #fca5a5;">
                    🎥 Free Training
                </div>
                <h2 class="section-title" style="color: white;">
                    Watch Our <span style="color: #dc2626;">YouTube Channel</span>
                </h2>
                <p class="section-description" style="color: #9ca3af;">
                    Get valuable insights and proven strategies for growing your mental health clinic — completely free.
                </p>
            </div>
            <div class="video-grid">
                <div class="video-card" onclick="window.open('https://youtu.be/BUZTxaAu79I?si=y3TTtVP-FumzKt1q', '_blank')">
                    <div class="video-thumbnail">
                        <img src="https://img.youtube.com/vi/BUZTxaAu79I/maxresdefault.jpg" alt="Video 1">
                        <div class="video-overlay">
                            <div class="play-button">
                                <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
                                    <path d="M0 0L20 12L0 24V0Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">How We Reverse Engineered a $100K/Month Clinic Funnel</h3>
                        <p class="video-description">See exactly how we broke down and rebuilt a winning marketing funnel.</p>
                    </div>
                </div>
                <div class="video-card" onclick="window.open('https://www.youtube.com/watch?v=J4S0nqjbo30', '_blank')">
                    <div class="video-thumbnail">
                        <img src="https://img.youtube.com/vi/J4S0nqjbo30/maxresdefault.jpg" alt="Video 2">
                        <div class="video-overlay">
                            <div class="play-button">
                                <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
                                    <path d="M0 0L20 12L0 24V0Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">How to 3X Your Clinic's Lead Quality in Less Than 10 Minutes</h3>
                        <p class="video-description">Learn the strategies that help clinics attract quality patients fast.</p>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <button class="btn-primary" onclick="window.open('https://www.youtube.com/@LivForMorMedia', '_blank')" style="background: #dc2626;">
                    Get More Practical Insights →
                </button>
            </div>
        </div>
    </section>

    <!-- C.A.R.E. Framework -->
    <section class="section" id="care">
        <div class="section-container">
            <div class="section-header">
                <div class="section-badge">
                    🎯 Our Proven Framework
                </div>
                <h2 class="section-title">
                    The <span class="gradient-text">C.A.R.E.</span> Framework
                </h2>
                <p class="section-description">
                    Meet the framework behind our clients' growth. A systematic approach to building sustainable patient pipelines.
                </p>
            </div>
            <div class="care-steps">
                <div class="care-step" onclick="toggleCareStep(0)">
                    <div class="care-step-header">
                        <div class="care-step-title-wrapper">
                            <div class="care-icon purple">
                                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="care-step-title">
                                    <span class="care-letter purple">C</span> — Clarity
                                </div>
                                <div class="care-subtitle">Define Your Ideal Patients</div>
                            </div>
                        </div>
                        <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                    <div class="care-step-content">
                        <div class="care-step-body">
                            <div>
                                <p style="color: #374151; line-height: 1.6;">We dive deep into understanding your ideal patient demographics, psychographics, and pain points. This clarity allows us to create messaging that resonates on an emotional level and drives action.</p>
                                <div class="care-benefits">
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Precise patient targeting</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Higher conversion rates</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Reduced acquisition costs</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Better patient-clinic fit</span>
                                    </div>
                                </div>
                            </div>
                            <div class="care-results" style="background: rgba(245, 243, 255, 1);">
                                <h4>Typical Results</h4>
                                <div class="result-item">
                                    <span class="result-label">Targeting Precision</span>
                                    <span class="result-value purple">+94%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Message Relevance</span>
                                    <span class="result-value purple">+87%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Conversion Rate</span>
                                    <span class="result-value purple">+156%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-step" onclick="toggleCareStep(1)">
                    <div class="care-step-header">
                        <div class="care-step-title-wrapper">
                            <div class="care-icon blue">
                                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.41 0-8-3.59-8-8V8.83l8-4.44 8 4.44V12c0 4.41-3.59 8-8 8z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="care-step-title">
                                    <span class="care-letter blue">A</span> — Authority
                                </div>
                                <div class="care-subtitle">Build Trust & Credibility</div>
                            </div>
                        </div>
                        <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                    <div class="care-step-content">
                        <div class="care-step-body">
                            <div>
                                <p style="color: #374151; line-height: 1.6;">We establish your clinic as the go-to authority in mental health treatments through strategic content, social proof, and thought leadership positioning.</p>
                                <div class="care-benefits">
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Enhanced credibility</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Increased patient confidence</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Premium positioning</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Competitive advantage</span>
                                    </div>
                                </div>
                            </div>
                            <div class="care-results" style="background: rgba(239, 246, 255, 1);">
                                <h4>Typical Results</h4>
                                <div class="result-item">
                                    <span class="result-label">Trust Score</span>
                                    <span class="result-value blue">+89%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Premium Pricing</span>
                                    <span class="result-value blue">+34%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Referral Rate</span>
                                    <span class="result-value blue">+67%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-step" onclick="toggleCareStep(2)">
                    <div class="care-step-header">
                        <div class="care-step-title-wrapper">
                            <div class="care-icon green">
                                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="care-step-title">
                                    <span class="care-letter green">R</span> — Reach
                                </div>
                                <div class="care-subtitle">Targeted Patient Acquisition</div>
                            </div>
                        </div>
                        <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                    <div class="care-step-content">
                        <div class="care-step-body">
                            <div>
                                <p style="color: #374151; line-height: 1.6;">Our precision-targeted advertising campaigns reach the right people at the right time with the right message, ensuring maximum ROI and quality patient acquisition.</p>
                                <div class="care-benefits">
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Consistent patient flow</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Optimized ad performance</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Scalable growth</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Measurable results</span>
                                    </div>
                                </div>
                            </div>
                            <div class="care-results" style="background: rgba(240, 253, 244, 1);">
                                <h4>Typical Results</h4>
                                <div class="result-item">
                                    <span class="result-label">Patient Volume</span>
                                    <span class="result-value green">+247%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Cost per Patient</span>
                                    <span class="result-value green">-42%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">ROI</span>
                                    <span class="result-value green">+389%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="care-step" onclick="toggleCareStep(3)">
                    <div class="care-step-header">
                        <div class="care-step-title-wrapper">
                            <div class="care-icon orange">
                                <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="care-step-title">
                                    <span class="care-letter orange">E</span> — Education
                                </div>
                                <div class="care-subtitle">Content That Converts</div>
                            </div>
                        </div>
                        <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                    <div class="care-step-content">
                        <div class="care-step-body">
                            <div>
                                <p style="color: #374151; line-height: 1.6;">We develop educational content strategies that nurture prospects, address concerns, and guide them through their decision-making journey.</p>
                                <div class="care-benefits">
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Reduced patient objections</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Faster decision-making</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Higher show-up rates</span>
                                    </div>
                                    <div class="care-benefit">
                                        <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                        <span>Improved patient outcomes</span>
                                    </div>
                                </div>
                            </div>
                            <div class="care-results" style="background: rgba(254, 243, 199, 1);">
                                <h4>Typical Results</h4>
                                <div class="result-item">
                                    <span class="result-label">Show-up Rate</span>
                                    <span class="result-value orange">+76%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Patient Satisfaction</span>
                                    <span class="result-value orange">+92%</span>
                                </div>
                                <div class="result-item">
                                    <span class="result-label">Treatment Completion</span>
                                    <span class="result-value orange">+84%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 4rem;">
                <button class="btn-primary" onclick="openModal()">Get Free Growth Resources →</button>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section" style="background: linear-gradient(135deg, #f9fafb, white);">
        <div class="section-container">
            <div class="section-header">
                <div class="section-badge">
                    🛡️ Why Choose LivForMor Media
                </div>
                <h2 class="section-title">
                    Ketamine, TMS, Spravato & Psychedelic Therapy<br>
                    <span class="gradient-text">Marketing Specialists</span>
                </h2>
            </div>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <div class="benefit-card-icon blue">
                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h3>High-Quality, Treatment-Ready Patients</h3>
                    <p>We build ad systems that deliver high-quality, treatment-ready patients every month.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-card-icon purple">
                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </div>
                    <h3>Direct-to-Pain Messaging</h3>
                    <p>We craft messaging that speaks directly to pain points and builds instant credibility.</p>
                </div>
                <div class="benefit-card">
                    <div class="benefit-card-icon green">
                        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                        </svg>
                    </div>
                    <h3>Automated Efficiency</h3>
                    <p>From automated funnels to pre-qualification — we increase efficiency without overloading your team.</p>
                </div>
            </div>
            <div class="features-box">
                <div class="features-content">
                    <div class="features-text">
                        <h3>Everything You Need to Scale</h3>
                        <p>Our comprehensive approach ensures every aspect of your patient acquisition is optimized for maximum results and minimum stress on your team.</p>
                        <div class="features-list">
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">HIPAA-compliant campaign management</span>
                            </div>
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">Real-time performance dashboards</span>
                            </div>
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">24/7 campaign monitoring & optimization</span>
                            </div>
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">Weekly strategy sessions</span>
                            </div>
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">Custom landing page creation</span>
                            </div>
                            <div class="feature-item">
                                <svg width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                                <span style="color: #374151; font-weight: 500;">Custom, unique ads tailored to your clinic</span>
                            </div>
                        </div>
                    </div>
                    <div class="features-cta">
                        <div class="features-cta-inner">
                            <h4>Ready to Grow Your Clinic?</h4>
                            <p>Let us build a custom patient acquisition system for your Ketamine, TMS, Spravato, or Psychedelic Therapy clinic.</p>
                            <div class="cta-features">
                                <div class="cta-feature">
                                    <svg width="20" height="20" fill="#10b981" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span style="color: #374151;">Free strategy consultation</span>
                                </div>
                                <div class="cta-feature">
                                    <svg width="20" height="20" fill="#10b981" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span style="color: #374151;">Custom growth roadmap</span>
                                </div>
                                <div class="cta-feature">
                                    <svg width="20" height="20" fill="#10b981" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span style="color: #374151;">No obligation to work with us</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Founders Section -->
    <section class="section" id="about">
        <div class="section-container">
            <div class="section-header">
                <div class="section-badge">
                    🏆 Meet the Founder
                </div>
                <h2 class="section-title">
                    Passionate About<br>
                    <span class="gradient-text">Healing Lives</span>
                </h2>
            </div>
            <div style="max-width: 600px; margin: 0 auto 4rem;">
                <div class="founder-card">
                    <div class="founder-avatar">
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/687b95cb6d123a0324ad6637/c45d6010d_WhatsAppImage2025-12-08at124721.jpg" alt="Oriel Mor">
                    </div>
                    <h3 class="founder-name">Oriel Mor</h3>
                    <p class="founder-role">Founder & CEO</p>
                    <p class="founder-specialty">Marketing & Strategy</p>
                    <p class="founder-bio">After managing over $1M in paid campaigns and spending 6 years in sales and advertising, Oriel shifted his focus to helping mental health clinics grow ethically and sustainably.</p>
                </div>
            </div>
            <div class="mission-box">
                <h3>My Mission</h3>
                <p>"Every mental health clinic deserves to reach the patients who need them most. My job is to bridge that gap with ethical, effective marketing that honors both the clinic's values and the patient's journey to healing."</p>
                <div class="mission-signature">
                    <div class="mission-line"></div>
                    <span class="mission-authors">Oriel Mor</span>
                    <div class="mission-line"></div>
                </div>
            </div>
            <div style="text-align: center;">
                <button class="btn-primary" onclick="openModal()">Get Free Practical Resources →</button>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="section" style="background: linear-gradient(135deg, #f9fafb, white);">
        <div class="section-container">
            <div class="section-header">
                <div class="section-badge">
                    ❓ Frequently Asked Questions
                </div>
                <h2 class="section-title">
                    Your Questions,<br>
                    <span class="gradient-text">Answered</span>
                </h2>
            </div>
            <div class="faq-list">
                <div class="faq-item" onclick="toggleFaq(0)">
                    <button class="faq-question">
                        What makes LivForMor Media different from other marketing agencies?
                        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            We're not just marketers — we're mental health clinic marketing specialists. Our team has insider knowledge from managing clinics and understands the unique challenges you face. We focus exclusively on Ketamine, TMS, Spravato, and Psychedelic therapy clinics, which means we know exactly what works in this space.
                        </div>
                    </div>
                </div>
                <div class="faq-item" onclick="toggleFaq(1)">
                    <button class="faq-question">
                        How quickly can I expect to see results?
                        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            Most clients see initial leads within 7-14 days of launching campaigns. However, optimizing for quality and volume typically takes 30-60 days as we gather data and refine targeting. Our goal is sustainable, scalable growth — not just quick wins.
                        </div>
                    </div>
                </div>
                <div class="faq-item" onclick="toggleFaq(2)">
                    <button class="faq-question">
                        Do you only work with established clinics or also with new startups?
                        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            We work with clinics at all stages! Whether you're just launching or looking to scale an established practice, we tailor our strategies to your specific needs and growth stage. New clinics benefit from our startup playbook, while established clinics can leverage our scaling systems.
                        </div>
                    </div>
                </div>
                <div class="faq-item" onclick="toggleFaq(3)">
                    <button class="faq-question">
                        What's your pricing structure?
                        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            We offer customized packages based on your clinic's needs, size, and growth goals. Our pricing includes strategy, campaign management, creative development, and ongoing optimization. Contact us for a free consultation where we'll provide a tailored proposal and transparent pricing.
                        </div>
                    </div>
                </div>
                <div class="faq-item" onclick="toggleFaq(4)">
                    <button class="faq-question">
                        Are your marketing practices HIPAA-compliant?
                        <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <div class="faq-answer-content">
                            Absolutely. We understand the importance of patient privacy and healthcare regulations. All our campaigns, tracking systems, and processes are built with HIPAA compliance in mind. We never compromise on protecting your patients' information.
                        </div>
                    </div>
                </div>
            </div>
            <div class="faq-cta">
                <h3>Still Have Questions?</h3>
                <p>We're here to help. Book a free consultation to discuss your clinic's specific needs.</p>
                <button class="btn-primary" onclick="openModal()">Book Free Consultation</button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>LivForMor Media</h3>
                <p>Specialized marketing agency for mental health clinics. Helping TMS, Ketamine, Spravato, and Psychedelic therapy clinics grow.</p>
            </div>
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: contact@livformor.com</p>
                <p>Phone: (555) 123-4567</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#care">C.A.R.E. Framework</a>
                <a href="#youtube">YouTube</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p style="color: #9ca3af;">&copy; 2025 LivForMor Media. All rights reserved.</p>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact</a>
            </div>
        </div>
    </footer>

    <!-- Resource Form Modal -->
    <div class="modal-overlay" id="modalOverlay" onclick="closeModalOnOverlay(event)">
        <div class="modal" onclick="event.stopPropagation()">
            <div id="modalContent"></div>
        </div>
    </div>

    <!-- Floating CTA -->
    <div class="floating-cta" id="floatingCta" style="display: none;">
        <button class="floating-btn" onclick="openModal()">
            🎁 Get Free Resources
        </button>
    </div>

    <script>
        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
        }

        function closeMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.remove('active');
        }

        // C.A.R.E. Framework Toggle
        function toggleCareStep(index) {
            const steps = document.querySelectorAll('.care-step');
            steps[index].classList.toggle('active');
        }

        // FAQ Toggle
        function toggleFaq(index) {
            const items = document.querySelectorAll('.faq-item');
            items[index].classList.toggle('active');
        }

        // Floating CTA
        let floatingCtaVisible = false;
        window.addEventListener('scroll', function() {
            const floatingCta = document.getElementById('floatingCta');
            if (window.scrollY > 800 && !floatingCtaVisible) {
                floatingCta.style.display = 'block';
                floatingCtaVisible = true;
            } else if (window.scrollY <= 800 && floatingCtaVisible) {
                floatingCta.style.display = 'none';
                floatingCtaVisible = false;
            }
        });

        // Modal State
        let currentStep = 1;
        let formData = {
            full_name: '',
            email: '',
            phone: '',
            clinic_type: '',
            clinic_stage: ''
        };

        function openModal() {
            currentStep = 1;
            formData = {
                full_name: '',
                email: '',
                phone: '',
                clinic_type: '',
                clinic_stage: ''
            };
            renderModal();
            document.getElementById('modalOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        function closeModalOnOverlay(event) {
            if (event.target.id === 'modalOverlay') {
                closeModal();
            }
        }

        function renderModal() {
            const content = document.getElementById('modalContent');
            
            if (currentStep === 1) {
                content.innerHTML = \`
                    <div class="modal-header">
                        <h2 class="modal-title">Where should we send your resources?</h2>
                        <button class="modal-close" onclick="closeModal()">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="step-indicators">
                            <div class="step-dot active"></div>
                            <div class="step-dot"></div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Full Name *</label>
                            <input type="text" class="form-input" id="full_name" value="\${formData.full_name}" placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email *</label>
                            <input type="email" class="form-input" id="email" value="\${formData.email}" placeholder="john@example.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Phone</label>
                            <input type="tel" class="form-input" id="phone" value="\${formData.phone}" placeholder="(555) 123-4567">
                        </div>
                        <div class="form-buttons">
                            <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                            <button class="btn-submit" onclick="nextStep()">Continue</button>
                        </div>
                    </div>
                \`;
            } else if (currentStep === 2) {
                content.innerHTML = \`
                    <div class="modal-header">
                        <h2 class="modal-title">Tell us about your clinic</h2>
                        <button class="modal-close" onclick="closeModal()">
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="step-indicators">
                            <div class="step-dot"></div>
                            <div class="step-dot active"></div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Clinic Type *</label>
                            <select class="form-select" id="clinic_type">
                                <option value="">Select clinic type...</option>
                                <option value="Ketamine" \${formData.clinic_type === 'Ketamine' ? 'selected' : ''}>Ketamine</option>
                                <option value="TMS" \${formData.clinic_type === 'TMS' ? 'selected' : ''}>TMS</option>
                                <option value="Spravato" \${formData.clinic_type === 'Spravato' ? 'selected' : ''}>Spravato</option>
                                <option value="Psychedelic" \${formData.clinic_type === 'Psychedelic' ? 'selected' : ''}>Psychedelic Therapy</option>
                                <option value="Multiple" \${formData.clinic_type === 'Multiple' ? 'selected' : ''}>Multiple Modalities</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Clinic Stage *</label>
                            <select class="form-select" id="clinic_stage">
                                <option value="">Select stage...</option>
                                <option value="Planning" \${formData.clinic_stage === 'Planning' ? 'selected' : ''}>Planning/Pre-launch</option>
                                <option value="New" \${formData.clinic_stage === 'New' ? 'selected' : ''}>New (0-6 months)</option>
                                <option value="Growing" \${formData.clinic_stage === 'Growing' ? 'selected' : ''}>Growing (6 months - 2 years)</option>
                                <option value="Established" \${formData.clinic_stage === 'Established' ? 'selected' : ''}>Established (2+ years)</option>
                            </select>
                        </div>
                        <div class="form-buttons">
                            <button class="btn-secondary" onclick="previousStep()">Back</button>
                            <button class="btn-submit" onclick="submitForm()">Get Resources</button>
                        </div>
                    </div>
                \`;
            } else if (currentStep === 3) {
                content.innerHTML = \`
                    <div class="modal-body">
                        <div class="success-message">
                            <div class="success-icon">
                                <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                </svg>
                            </div>
                            <h3 class="success-title">Resources on the Way!</h3>
                            <p class="success-text">Check your email for your free resources and growth strategies tailored to your clinic.</p>
                            <button class="btn-primary" onclick="closeModal()">Close</button>
                        </div>
                    </div>
                \`;
                
                // Redirect after 3 seconds
                setTimeout(function() {
                    window.location.href = 'https://clinic-growth-accelerator-85338975.base44.app/';
                }, 3000);
            }
        }

        function nextStep() {
            // Capture form data
            formData.full_name = document.getElementById('full_name').value;
            formData.email = document.getElementById('email').value;
            formData.phone = document.getElementById('phone').value;

            // Validate
            if (!formData.full_name || !formData.email) {
                alert('Please fill in all required fields');
                return;
            }

            currentStep = 2;
            renderModal();
        }

        function previousStep() {
            currentStep = 1;
            renderModal();
        }

        async function submitForm() {
            // Capture form data
            formData.clinic_type = document.getElementById('clinic_type').value;
            formData.clinic_stage = document.getElementById('clinic_stage').value;

            // Validate
            if (!formData.clinic_type || !formData.clinic_stage) {
                alert('Please fill in all required fields');
                return;
            }

            // Send to webhook
            try {
                await fetch('https://services.leadconnectorhq.com/hooks/MSFgME5t3cZZRgzhEnI2/webhook-trigger/44b1231f-f69c-4962-9437-a661d0ec24fc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }

            currentStep = 3;
            renderModal();
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    </script>
</body>
</html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'livformor-media-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Export HTML for Go High Level</h1>
          <p className="text-lg text-gray-600 mb-6">
            Complete standalone HTML file with all sections, animations, and functionality. Ready to use in Go High Level or any platform.
          </p>
          
          <div className="flex gap-4 mb-8">
            <Button onClick={copyToClipboard} className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy HTML
                </>
              )}
            </Button>
            <Button onClick={downloadHTML} variant="outline" className="border-2">
              <Download className="w-5 h-5 mr-2" />
              Download HTML File
            </Button>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
              {htmlContent}
            </pre>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ What's Included:</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Hero section with animated gradient background</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Free Resources CTA section</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>YouTube videos section with embedded content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>C.A.R.E. Framework accordion with full details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Why Choose Us section with benefits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>About section (Founder - Oriel Mor)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>FAQ section with expandable answers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Footer with privacy policy links</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Resource form modal with 2 steps + webhook integration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Floating CTA button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>Responsive mobile navigation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-600 font-bold">•</span>
              <span>All CSS and JavaScript inline (no external dependencies)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}