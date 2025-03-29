"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Heart,
  History,
  Pills,
  User
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const quickActions = [
    {
      title: "Check Symptoms",
      icon: Activity,
      href: "/symptoms",
      color: "text-blue-500"
    },
    {
      title: "Medical History",
      icon: History,
      href: "/medical-history",
      color: "text-green-500"
    },
    {
      title: "Appointments",
      icon: Calendar,
      href: "/appointments",
      color: "text-purple-500"
    },
    {
      title: "Medications",
      icon: Pills,
      href: "/medications",
      color: "text-red-500"
    }
  ];

  const recentActivities = [
    {
      title: "Symptom Check",
      description: "Checked symptoms for headache and fever",
      time: "2 hours ago",
      icon: Activity
    },
    {
      title: "New Prescription",
      description: "Received prescription for antibiotics",
      time: "1 day ago",
      icon: FileText
    },
    {
      title: "Vital Signs",
      description: "Updated blood pressure readings",
      time: "2 days ago",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button variant="outline" onClick={() => router.push("/auth/login")}>
              <User className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(action.href)}>
                <CardContent className="p-6">
                  <action.icon className={`h-8 w-8 ${action.color} mb-4`} />
                  <h3 className="font-semibold">{action.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}