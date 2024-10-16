"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, profileSchema } from "../utils/schemas";
import Profile from "./Profile";
import User from "./User";
import { Button } from "@/components/ui/button";
import { signup } from "../login/actions";

const steps = ["user", "profile"];

export default function RegisterForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    favoriteType: "Water",
    favoritePokemon: "",
    avatar: "",
  });

  const stepSchemas = [userSchema, profileSchema];
  const methods = useForm({
    resolver: zodResolver(stepSchemas[stepIndex]),
    mode: "onChange",
    defaultValues: formData,
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      const currentStepData = methods.getValues();
      setFormData((prev) => ({ ...prev, ...currentStepData }));
      setStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => setStepIndex((prev) => prev - 1);

  const onSubmit = async (data: any) => {
    const finalStepData = methods.getValues();
    const fullFormData = { ...formData, ...finalStepData };
    console.log("Final Form Data:", fullFormData);
    const formDataObj = new FormData();
    Object.entries(fullFormData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    formDataObj.forEach((value, key) => {
      console.log(key, value);
    });

    await signup(formDataObj);
  };

  return (
    <div className="max-w-2xl h-auto mx-auto p-8 backdrop-blur-2xl  shadow-md rounded-lg ">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`w-full text-center py-2 rounded-lg font-semibold ${
                  stepIndex === index
                    ? "bg-red-950 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </div>
            ))}
          </div>

          <div className="p-4  bg-gray-100 bg-opacity-80 rounded-lg shadow-inner">
            {stepIndex === 0 && <User />}
            {stepIndex === 1 && <Profile />}
          </div>

          <div className="flex justify-between mt-4">
            {stepIndex > 0 && (
              <Button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Previous
              </Button>
            )}
            {stepIndex < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-red-950 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
