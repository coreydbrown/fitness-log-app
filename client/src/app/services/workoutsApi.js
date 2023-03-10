import { api } from "./api";

export const workoutsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllWorkouts: build.query({
      query: ({ page, limit }) => `workouts?page=${page}&limit=${limit}`,
      providesTags: ["workouts"],
    }),
    addWorkout: build.mutation({
      query: (workout) => ({
        url: "workouts",
        method: "POST",
        body: workout,
      }),
      invalidatesTags: ["workouts", "records"],
    }),
  }),
});

export const { useGetAllWorkoutsQuery, useAddWorkoutMutation } = workoutsApi;
