import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Policies = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Legal Policies</h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to transparency and protecting your rights
            </p>
          </div>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-16">
        <div className="container max-w-4xl space-y-8">
          {/* Privacy Policy */}
          <Card id="privacy" className="group hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out">
            <CardHeader>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Information We Collect</h3>
                  <p>We collect information you provide directly to us, including name, email address, phone number, and payment information when you enroll in our courses.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your course enrollments and payments</li>
                    <li>Send you course updates and educational content</li>
                    <li>Respond to your comments and questions</li>
                    <li>Provide career support and internship opportunities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Information Sharing</h3>
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our platform and delivering services to you.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. Data Security</h3>
                  <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. Your Rights</h3>
                  <p>You have the right to access, update, or delete your personal information at any time by contacting us at info@skilledge.in.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card id="terms" className="group hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out">
            <CardHeader>
              <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                  <p>By accessing and using SkillEdge Academy, you accept and agree to be bound by the terms and conditions of this agreement.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Course Access</h3>
                  <p>Upon successful enrollment and payment, you will receive lifetime access to the course materials unless otherwise specified. Access is granted to you as an individual and may not be shared.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Intellectual Property</h3>
                  <p>All course content, including videos, documents, and materials, are the intellectual property of SkillEdge Academy. You may not reproduce, distribute, or create derivative works without written permission.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. User Conduct</h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Share your account credentials with others</li>
                    <li>Copy, download, or redistribute course materials</li>
                    <li>Use the platform for any unlawful purpose</li>
                    <li>Interfere with the proper functioning of the platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. Certificates</h3>
                  <p>Certificates are issued upon successful completion of course requirements. Certificates reflect your completion of our course and do not constitute professional certification or licensure.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">6. Limitation of Liability</h3>
                  <p>SkillEdge Academy shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card id="refund" className="group hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 ease-out">
            <CardHeader>
              <CardTitle className="text-2xl">Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="font-semibold text-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Refund Eligibility</h3>
                  <p>We offer a 7-day money-back guarantee from the date of enrollment. To be eligible for a refund, you must:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Request the refund within 7 days of enrollment</li>
                    <li>Have completed less than 30% of the course content</li>
                    <li>Not have downloaded course materials or certificates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Non-Refundable Items</h3>
                  <p>The following are not eligible for refunds:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Courses accessed beyond 7 days from enrollment</li>
                    <li>Courses where a certificate has been issued</li>
                    <li>Courses purchased at a promotional or discounted rate</li>
                    <li>Processing fees and payment gateway charges</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Refund Process</h3>
                  <p>To request a refund, email us at info@skilledge.in with your enrollment details and reason for refund. Approved refunds will be processed within 7-10 business days to your original payment method.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. Technical Issues</h3>
                  <p>If you experience technical difficulties preventing course access, please contact our support team immediately. We will work to resolve the issue or provide a refund if the problem cannot be resolved.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. Cancellation by SkillEdge</h3>
                  <p>If we cancel a course for any reason, you will receive a full refund of the enrollment fee or be offered transfer to an alternative course of equal value.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">6. Contact Information</h3>
                  <p>For refund inquiries, contact us at:</p>
                  <ul className="list-none ml-4 mt-2 space-y-1">
                    <li>Email: info@skilledge.in</li>
                    <li>Phone: +91 98765 43210</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policies;
