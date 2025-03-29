"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function PredictPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const symptoms = searchParams.get('symptoms')

  useEffect(() => {
    const predictDisease = async () => {
      try {
        // In production, this would be your actual API call
        const mockApiCall = new Promise(resolve => setTimeout(resolve, 2000))
        await mockApiCall
        
        // Redirect to results page with mock data
        router.push(`/results?disease=Viral%20Fever&symptoms=${symptoms}`)
      } catch (error) {
        console.error('Prediction failed:', error)
      }
    }

    if (symptoms) {
      predictDisease()
    }
  }, [symptoms, router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-primary/5 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-2">Analyzing Your Symptoms</h2>
        <p className="text-muted-foreground">
          Our AI is processing your symptoms to provide accurate recommendations...
        </p>
      </motion.div>
    </main>
  )
}