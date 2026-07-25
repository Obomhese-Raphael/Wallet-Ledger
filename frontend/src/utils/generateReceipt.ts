import jsPDF from "jspdf";

interface ReceiptData {
  recipient: string;
  email: string;
  amount: number;
  description: string;
  reference: string;
  status: string;
  date: string;
}

export function generateReceipt(data: ReceiptData) {
  const pdf = new jsPDF();

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("Wallet Ledger", 105, 20, {
    align: "center",
  });

  pdf.setFontSize(16);
  pdf.text("Transfer Receipt", 105, 30, {
    align: "center",
  });

  pdf.setDrawColor(220);
  pdf.line(20, 38, 190, 38);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  let y = 55;

  const row = (label: string, value: unknown) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(label, 20, y);

    pdf.setFont("helvetica", "normal");
    pdf.text(String(value ?? "-"), 80, y);

    y += 12;
  };

  row("Recipient", data.recipient);
  row("Email", data.email);
  row("Amount", `₦${data.amount.toLocaleString()}`);
  row("Description", data.description);
  row("Reference", data.reference);
  row("Status", data.status);
  row("Date", data.date);

  pdf.line(20, y + 5, 190, y + 5);

  pdf.setFontSize(11);

  pdf.text("Thank you for using Wallet Ledger.", 105, y + 18, {
    align: "center",
  });

  pdf.save(`Receipt-${data.reference}.pdf`);
}
