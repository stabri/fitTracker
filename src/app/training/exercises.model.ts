export interface ExercisesModel {
  id: string;
  name: string;
  duration: number;
  calories: number;
  // optional ?
  date?: Date;
  state?: 'completed' | 'cancalled' | null;
}
