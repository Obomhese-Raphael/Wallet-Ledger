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

  // Background
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, 210, 297, "F");

  // ===========================
  // Header
  // ===========================

  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, 210, 35, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("Wallet Ledger", 105, 16, { align: "center" });

  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.text("TRANSFER RECEIPT", 105, 26, {
    align: "center",
  });

  // ===========================
  // Success Banner
  // ===========================

  pdf.setFillColor(220, 252, 231);
  pdf.roundedRect(20, 45, 170, 26, 5, 5, "F");

  pdf.setTextColor(22, 163, 74);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("TRANSFER SUCCESSFUL", 105, 61, {
    align: "center",
  });

  // ===========================
  // Amount
  // ===========================

  pdf.setTextColor(15, 23, 42);

  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.text("Amount", 105, 88, {
    align: "center",
  });

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);

  pdf.setTextColor(5, 150, 105);

  pdf.text(`NGN ${data.amount.toLocaleString()}`, 105, 102, {
    align: "center",
  });

  // ===========================
  // Information Box
  // ===========================

  pdf.setDrawColor(220);
  pdf.roundedRect(20, 112, 170, 105, 5, 5);

  let y = 126;

  function row(label: string, value: string) {
    pdf.setTextColor(100);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");

    pdf.text(label, 28, y);

    pdf.setTextColor(20);

    pdf.setFont("helvetica", "normal");

    pdf.text(String(value), 92, y);

    pdf.setDrawColor(235);
    pdf.line(28, y + 5, 182, y + 5);

    y += 16;
  }

  row("Recipient", data.recipient);
  row("Email", data.email);
  row("Description", data.description || "-");
  row("Reference", data.reference);
  row("Status", data.status.toUpperCase());
  row("Date", data.date);

  // ===========================
  // Footer
  // ===========================

  pdf.setFont("helvetica", "italic");

  pdf.setFontSize(10);

  pdf.setTextColor(120);

  pdf.text("Thank you for using Wallet Ledger.", 105, 238, { align: "center" });

  pdf.text(
    "This receipt serves as proof of your completed electronic transaction.",
    105,
    245,
    { align: "center" },
  );

  pdf.setDrawColor(220);
  pdf.line(25, 255, 185, 255);

  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(15, 23, 42);

  pdf.text("walletledger.app", 105, 266, { align: "center" });

  pdf.save(`WalletLedger-${data.reference}.pdf`);
}
