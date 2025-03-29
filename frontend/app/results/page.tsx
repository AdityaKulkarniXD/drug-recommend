"use client"

import { useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  Pill, 
  ShieldAlert, 
  Apple, 
  Dumbbell,
  Share2
} from "lucide-react"
import { toast } from "sonner"

// Mock data - In production, this would come from your backend
const mockResults = {
  disease: "Viral Fever",
  description: "A viral fever refers to any fever that's caused by an underlying viral illness. A variety of viral infections can affect humans, from the common cold to the flu.",
  precautions: [
    "Rest and adequate sleep",
    "Increase fluid intake",
    "Take paracetamol",
    "Avoid crowded places"
  ],
  medications: [
    "Paracetamol",
    "Ibuprofen",
    "Antiviral medications if prescribed"
  ],
  diet: [
    "Clear broths",
    "Citrus fruits",
    "Green leafy vegetables",
    "Honey and warm water"
  ],
  workout: [
    "Light stretching when feeling better",
    "Short walks when fever subsides",
    "Gentle yoga after recovery"
  ]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const symptoms = searchParams.get('symptoms')?.split(',') || []

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-4xl mx-auto space-y-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-4">
              Analysis Results
            </h1>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {symptoms.map((symptom) => (
                <Badge key={symptom} variant="outline">
                  {symptom.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Predicted Condition</h2>
              </div>
              <p className="text-xl font-medium text-primary">{mockResults.disease}</p>
              <p className="mt-2 text-muted-foreground">{mockResults.description}</p>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Precautions</h2>
              </div>
              <ul className="space-y-2">
                {mockResults.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {precaution}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Pill className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Recommended Medications</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockResults.medications.map((medication, index) => (
                  <Badge key={index} variant="secondary">
                    {medication}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Apple className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Dietary Recommendations</h2>
              </div>
              <ul className="space-y-2">
                {mockResults.diet.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Exercise Recommendations</h2>
              </div>
              <ul className="space-y-2">
                {mockResults.workout.map((exercise, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {exercise}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex justify-center"
          >
            <Button
              onClick={handleShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}