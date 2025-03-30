import type { Metadata } from "next"
import { AppointmentForm } from "@/components/appointment-form"

export const metadata: Metadata = {
  title: "Book an Appointment | Suncare Hospital",
  description: "Schedule an appointment with our healthcare professionals at Suncare Hospital.",
}

export default function AppointmentPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Book an Appointment</h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-[700px]">
              Schedule a visit with our healthcare professionals for personalized care
            </p>
          </div>

          <AppointmentForm />
        </div>
      </section>
    </main>
  )
}

