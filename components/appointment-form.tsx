"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { CalendarIcon, Clock, Mail, Phone, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    doctor: "",
    date: null as Date | null,
    time: "",
    appointmentType: "new",
    insurance: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  // Update the form submission to redirect to WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare WhatsApp message with form data
    const message = `
      Appointment Request:
      Name: ${formData.firstName} ${formData.lastName}
      Department: ${formData.department}
      Doctor: ${formData.doctor ? doctors.find((d) => d.id === formData.doctor)?.name : "Any available"}
      Date: ${formData.date ? format(formData.date, "PPP") : "Flexible"}
      Time: ${formData.time || "Flexible"}
      Type: ${formData.appointmentType === "new" ? "New Patient" : "Follow-up"}
      Reason: ${formData.message}
    `
      .trim()
      .replace(/\n/g, "%0A")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to WhatsApp
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank")

    toast({
      title: "Redirecting to WhatsApp",
      description: "You'll be redirected to WhatsApp to confirm your appointment details.",
    })

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      doctor: "",
      date: null,
      time: "",
      appointmentType: "new",
      insurance: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  // Filter doctors based on selected department
  const filteredDoctors = formData.department
    ? doctors.filter((doctor) => doctor.department === formData.department)
    : []

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary/90 to-primary/70 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Schedule an Appointment</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input
                  id="insurance"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appointment Details</h3>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select
                  value={formData.doctor}
                  onValueChange={(value) => handleSelectChange("doctor", value)}
                  disabled={!formData.department}
                >
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder={formData.department ? "Select doctor" : "Select department first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date || undefined}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => {
                          // Disable past dates and weekends
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          const day = date.getDay()
                          return date < today || day === 0 || day === 6
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => handleSelectChange("time", value)}
                    disabled={!formData.date}
                  >
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <RadioGroup
                  value={formData.appointmentType}
                  onValueChange={(value) => handleSelectChange("appointmentType", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="cursor-pointer">
                      New Patient
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="follow-up" id="follow-up" />
                    <Label htmlFor="follow-up" className="cursor-pointer">
                      Follow-up
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Reason for Visit</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                name="message"
                rows={4}
                className="pl-10"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please briefly describe your symptoms or reason for appointment"
                required
              />
            </div>
          </div>

          {/* Update the submit button text */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {/* Button redirects to hospital's WhatsApp (+91 98765 43210) */}
                Schedule via WhatsApp
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
  "Dermatology",
  "Ophthalmology",
  "ENT",
]

const doctors = [
  { id: "dr-1", name: "Dr. Sarah Johnson", department: "Cardiology" },
  { id: "dr-2", name: "Dr. Robert Thompson", department: "Cardiology" },
  { id: "dr-3", name: "Dr. Maria Gonzalez", department: "Cardiology" },
  { id: "dr-4", name: "Dr. Michael Chen", department: "Neurology" },
  { id: "dr-5", name: "Dr. William Taylor", department: "Neurology" },
  { id: "dr-6", name: "Dr. Jennifer Lee", department: "Neurology" },
  { id: "dr-7", name: "Dr. Emily Rodriguez", department: "Pediatrics" },
  { id: "dr-8", name: "Dr. David Martinez", department: "Pediatrics" },
  { id: "dr-9", name: "Dr. James Wilson", department: "Orthopedics" },
  { id: "dr-10", name: "Dr. Sophia Kim", department: "Orthopedics" },
  { id: "dr-11", name: "Dr. Lisa Patel", department: "General Medicine" },
  { id: "dr-12", name: "Dr. Thomas Brown", department: "General Medicine" },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

