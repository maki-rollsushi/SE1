import { books } from "./Data/data";

// Difficulty order for filtering
const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export function getRecommendedBooks(user) {
  const completedBookIds = user.progress.map((p) => p.bookId);

  // Determine max difficulty based on points
  let maxDifficulty = "Beginner";
  if (user.points >= 400) maxDifficulty = "Advanced";
  else if (user.points >= 200) maxDifficulty = "Intermediate";

  // Filter books not yet completed and within difficulty
  const recommended = books
    .filter((b) => !completedBookIds.includes(b.bookId))
    .filter(
      (b) => difficultyOrder[b.difficulty] <= difficultyOrder[maxDifficulty]
    )
    .slice(0, 5); // only top 5

  // Teacher and student uploads will always be fully shown
  const teacherMaterials = books.filter((b) => b.source === "Teacher");
  const studentUploads = books.filter((b) => b.source === "user");
  const appBooks = books.filter((b) => b.source === "app");

  return { recommended, teacherMaterials, studentUploads, appBooks };
}
