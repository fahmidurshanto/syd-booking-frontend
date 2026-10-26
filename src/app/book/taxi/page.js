import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Book Taxi Service | SYD Airport Transfer",
  description:
    "Book fast, direct standard and maxi taxi transfers for Sydney Airport and greater Sydney with upfront pricing.",
};

export default function TaxiBookingPage() {
  return <BookingForm category="taxi" />;
}
