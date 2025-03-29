"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Brain, Activity, Pill, Apple, Dumbbell, ArrowRight, Shield, Clock } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const router = useRouter()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning algorithms analyze your symptoms for accurate disease prediction"
    },
    {
      icon: Pill,
      title: "Medication Recommendations",
      description: "Get personalized medicine suggestions based on your condition"
    },
    {
      icon: Apple,
      title: "Diet Plans",
      description: "Receive customized dietary recommendations to support your recovery"
    },
    {
      icon: Dumbbell,
      title: "Exercise Routines",
      description: "Access tailored workout plans that complement your treatment"
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access healthcare insights anytime, anywhere"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and secure"
    },
    {
      icon: Activity,
      title: "Continuous Monitoring",
      description: "Track your health progress over time"
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-primary/5">
        <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-pattern" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your AI Health Assistant
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the future of healthcare with personalized medicine recommendations powered by advanced AI
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => router.push('/auth/register')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/auth/login')}
              >
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Why Choose CuraAI?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-card shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Healthcare Made Simple</h2>
            <p className="text-lg text-muted-foreground">
              Experience a new way of managing your health with our comprehensive platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust CuraAI for their healthcare needs
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push('/auth/register')}
          >
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  )
}