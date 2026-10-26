import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book Executive Chauffeur Service | SYD Airport Transfer",
  description:
    "Reserve private luxury chauffeur transfers across Sydney. Mercedes-Benz, BMW, Audi & Genesis fleet with professional chauffeurs.",
};

export default function ChauffeurBookingPage() {
  return <BookingForm category="chauffeur" />;
}
