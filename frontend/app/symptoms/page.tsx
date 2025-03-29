"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Extract unique symptoms from the dataset
const availableSymptoms = [
  "itching", "skin_rash", "nodal_skin_eruptions", "dischromic_patches",
  "continuous_sneezing", "shivering", "chills", "watering_from_eyes",
  "stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough",
  "burning_micturition", "spotting_urination", "fatigue", "weight_loss",
  "restlessness", "lethargy", "patches_in_throat", "high_fever",
  "extra_marital_contacts", "muscle_wasting", "irregular_sugar_level",
  "sunken_eyes", "dehydration", "diarrhoea", "breathlessness",
  "family_history", "headache", "chest_pain", "dizziness", "loss_of_balance",
  "lack_of_concentration", "indigestion", "blurred_and_distorted_vision",
  "excessive_hunger", "back_pain", "weakness_in_limbs", "neck_pain",
  "weakness_of_one_body_side", "altered_sensorium", "weight_gain",
  "anxiety", "cold_hands_and_feets", "mood_swings", "joint_pain",
  "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck",
  "swelling_joints", "movement_stiffness", "painful_walking", "nausea",
  "spinning_movements", "loss_of_appetite", "pain_during_bowel_movements",
  "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "cramps",
  "bruising", "obesity", "swollen_legs", "puffy_face_and_eyes",
  "enlarged_thyroid", "brittle_nails", "swollen_extremities",
  "yellowing_of_eyes", "dark_urine", "yellowish_skin", "swelling_of_stomach",
  "distention_of_abdomen", "history_of_alcohol_consumption",
  "fluid_overload", "prominent_veins_on_calf", "palpitations",
  "painful_walking", "pus_filled_pimples", "blackheads", "scurring",
  "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
  "inflammatory_nails", "blister", "red_sore_around_nose",
  "yellow_crust_ooze"
].sort();

export default function SymptomsPage() {
  const router = useRouter()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
    setOpen(false)
  }

  const removeSymptom = (symptomToRemove: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true)
    router.push(`/predict?symptoms=${selectedSymptoms.join(',')}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-8">
            Describe Your Symptoms
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Select your symptoms from the list below and our AI system will analyze them to provide personalized recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-start text-left"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {selectedSymptoms.length === 0 ? "Select symptoms..." : `${selectedSymptoms.length} symptom(s) selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search symptoms..." />
                      <CommandList>
                        <CommandEmpty>No symptom found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {availableSymptoms.map((symptom) => (
                            <CommandItem
                              key={symptom}
                              value={symptom}
                              onSelect={() => handleSelectSymptom(symptom)}
                              className="cursor-pointer"
                            >
                              {symptom.replace(/_/g, ' ')}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {symptom.replace(/_/g, ' ')}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => removeSymptom(symptom)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || selectedSymptoms.length === 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Symptoms...
                  </>
                ) : (
                  'Analyze Symptoms'
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}