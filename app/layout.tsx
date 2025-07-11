export const metadata = {
  title: "Study Tracker",
  description: "Track your study tasks, XP, streaks, and Pomodoros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
