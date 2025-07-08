export const seedMockData = () => {
  if (localStorage.getItem("entnt_seeded")) return;

  localStorage.setItem("users", JSON.stringify([
    { id: "1", role: "Admin",   email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Patient", email: "john@entnt.in",  password: "patient123", patientId: "p1" }
  ]));


  const patients = [
    { id: "p1", name: "John Doe",       dob: "1990-05-10", contact: "1234567890", healthInfo: "No allergies" },
    { id: "p2", name: "Jane Smith",     dob: "1985-11-22", contact: "9876543210", healthInfo: "Diabetic" },
    { id: "p3", name: "Michael Brown",  dob: "1992-02-28", contact: "9988776655", healthInfo: "Asthmatic" },
    { id: "p4", name: "Emily Johnson",  dob: "1978-07-15", contact: "1122334455", healthInfo: "Hypertensive" },
    { id: "p5", name: "Carlos Ortega",  dob: "1988-09-05", contact: "5544332211", healthInfo: "Peanut allergy" }
  ];
  localStorage.setItem("patients", JSON.stringify(patients));

  const b64PDF  = "data:application/pdf;base64,JVBERi0xLjQKZHVtbXk=";        // placeholder
  const b64PNG  = "data:image/png;base64,iVBORw0KGZHVtbXk=";                 // placeholder

  const incidents = [
    {
      id: "i1", patientId: "p1", patientName: "John Doe",
      title: "Toothache", description: "Upper molar pain", comments: "Sensitive to cold",
      appointmentDate: "2025-07-01T10:00",
      cost: 80, treatment: "Cavity filling", status: "Completed", nextDate: "2025-08-01T10:00",
      files: [
        { name: "invoice.pdf", url: b64PDF },
        { name: "xray.png",    url: b64PNG }
      ]
    },
    {
      id: "i2", patientId: "p2", patientName: "Jane Smith",
      title: "Cleaning", description: "Routine hygiene cleaning", comments: "",
      appointmentDate: "2025-06-30T09:00",
      cost: 50, treatment: "Scaling & Polish", status: "Completed",
      files: []
    },
    {
      id: "i3", patientId: "p3", patientName: "Michael Brown",
      title: "Root Canal", description: "Severe decay", comments: "Needs follow-up X-ray",
      appointmentDate: "2025-06-25T14:00",
      cost: 200, treatment: "Root canal therapy", status: "Completed",
      files: []
    },
    {
      id: "i4", patientId: "p4", patientName: "Emily Johnson",
      title: "Implant Consultation", description: "Missing lower premolar",
      comments: "", appointmentDate: "2025-07-20T11:00",
      status: "Pending", files: []
    },
    {
      id: "i5", patientId: "p5", patientName: "Carlos Ortega",
      title: "Braces Adjustment", description: "Monthly tightening",
      comments: "", appointmentDate: "2025-07-18T15:30",
      status: "Pending", files: []
    },
    {
      id: "i6", patientId: "p2", patientName: "Jane Smith",
      title: "Follow-up Cleaning", description: "6-month recall",
      comments: "", appointmentDate: "2025-07-22T09:00",
      status: "Pending", files: []
    },
    {
      id: "i7", patientId: "p1", patientName: "John Doe",
      title: "Whitening Session", description: "In-office whitening",
      comments: "Check sensitivity after session",
      appointmentDate: "2025-07-12T10:30",
      cost: 120, treatment: "Zoom Whitening", status: "Completed",
      files: []
    },
    {
      id: "i8", patientId: "p3", patientName: "Michael Brown",
      title: "Crown Placement", description: "Post-root canal crown",
      comments: "", appointmentDate: "2025-07-15T13:00",
      cost: 500, treatment: "Porcelain crown", status: "Completed",
      files: []
    },
    {
      id: "i9", patientId: "p4", patientName: "Emily Johnson",
      title: "Deep Cleaning", description: "Perio maintenance",
      comments: "Patient nervous, allow extra time",
      appointmentDate: "2025-07-28T10:00",
      status: "Pending",
      files: []
    },
    {
      id: "i10", patientId: "p5", patientName: "Carlos Ortega",
      title: "Wisdom Tooth Extraction", description: "Impacted lower wisdom tooth",
      comments: "Prescribe antibiotics pre-op",
      appointmentDate: "2025-07-25T16:00",
      status: "Pending",
      files: []
    }
  ];

  localStorage.setItem("incidents", JSON.stringify(incidents));

  localStorage.setItem("entnt_seeded", "yes");
};
