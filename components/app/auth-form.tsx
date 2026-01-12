// "use client";
// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { Checkbox } from "@heroui/react";

// import loginSchema from "@/schema/auth";
// import { signIn } from "@/lib/utils";
// import { RootState } from "@/redux/store";
// import { clearAuth, setAuth } from "@/redux/auth/authReducer";
// export default function AuthForm() {
//   const loading = useSelector((item: RootState) => item?.loading?.loading);
//   const auth = useSelector((item: RootState) => item?.auth.auth);
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema()),
//     defaultValues: {
//       email: auth.email,
//       password: auth.password,
//     },
//   });
//   const email = useMemo(() => {
//     return watch("email");
//   }, [watch("email")]);
//   const password = useMemo(() => {
//     return watch("password");
//   }, [watch("password")]);
//   const [isPassword, setIsPassword] = useState(true);
//   const router = useRouter();
//   const submit = (data: any) => {
//     try {
//       signIn(
//         {
//           email: data.email,
//           password: data.password,
//         },
//         dispatch,
//         router,
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
//       <div className="flex flex-col gap-1">
//         <label
//           className={`${!!errors["email"] ? "text-red-300" : "text-black"} font-medium mb-2`}
//           htmlFor="email"
//         >
//           Email
//         </label>
//         <div className="relative">
//           <Input
//             {...register("email")}
//             classNames={{
//               inputWrapper: `bg-white backdrop-blur-sm border-2 ${!!errors["email"] ? "border-red-300" : "border-black"} data-[hover=true]:bg-white/25`,
//               input: `text-black placeholder:${!!errors["email"] ? "text-red-300" : "text-black"}`,
//               errorMessage: "text-red-300 text-sm text-center",
//             }}
//             errorMessage={errors["email"]?.message}
//             isInvalid={!!errors["email"]}
//             name="email"
//             placeholder="you@example.com"
//             startContent={
//               <FiMail
//                 className={`text-xl ${!!errors["email"] ? "text-red-300" : "text-black"} pointer-events-none flex-shrink-0`}
//               />
//             }
//             type="email"
//           />
//         </div>
//       </div>
//       <div className="flex flex-col gap-1">
//         <label
//           className={`${!!errors["password"] ? "text-red-300" : "text-black"} font-medium mb-2`}
//           htmlFor="password"
//         >
//           Password
//         </label>
//         <div className="relative">
//           <Input
//             {...register("password")}
//             classNames={{
//               inputWrapper: `bg-white backdrop-blur-sm border-2 ${!!errors["password"] ? "border-red-300" : "border-black"} data-[hover=true]:bg-white/25`,
//               input: `text-black placeholder:${!!errors["password"] ? "text-red-300" : "text-black"}`,
//               errorMessage: "text-red-300 text-sm text-center",
//             }}
//             endContent={
//               isPassword ? (
//                 <FiEye
//                   className="text-xl text-black cursor-pointer flex-shrink-0"
//                   onClick={() => setIsPassword(!isPassword)}
//                 />
//               ) : (
//                 <FiEyeOff
//                   className="text-xl text-black cursor-pointer flex-shrink-0"
//                   onClick={() => setIsPassword(!isPassword)}
//                 />
//               )
//             }
//             errorMessage={errors["password"]?.message}
//             isInvalid={!!errors["password"]}
//             name="password"
//             placeholder="**********"
//             startContent={
//               <FiLock
//                 className={`text-xl ${!!errors["password"] ? "text-red-300" : "text-black"} pointer-events-none flex-shrink-0`}
//               />
//             }
//             type={isPassword ? "password" : "text"}
//           />
//         </div>
//       </div>
//       <Button
//         className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-6 hover:from-cyan-600 hover:to-purple-700 transition-all"
//         disabled={loading}
//         type="submit"
//       >
//         {loading ? "SigningIn..." : "Sign In"}
//       </Button>
//       <Checkbox
//         color="primary"
//         isSelected={auth.remember}
//         onValueChange={(value) => {
//           if (value) {
//             dispatch(
//               setAuth({
//                 email,
//                 password,
//                 remember: true,
//               }),
//             );
//           } else {
//             dispatch(clearAuth());
//           }
//         }}
//       >
//         Remember Me
//       </Checkbox>
//     </form>
//   );
// }


// components/AuthForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import loginSchema from "@/schema/auth";
import { signIn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { clearAuth, setAuth } from "@/redux/auth/authReducer";

export default function AuthForm() {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const authState = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isPassword, setIsPassword] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema()),
    defaultValues: {
      email: authState.email,
      password: authState.password,
    },
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: any) => {
    await signIn(data.email, data.password, dispatch, router);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          className={`${errors.email ? "text-red-300" : "text-black"} font-medium mb-2`}
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative">
          <Input
            {...register("email")}
            type="email"
            name="email"
            placeholder="you@example.com"
            startContent={<FiMail className={`text-xl ${errors.email ? "text-red-300" : "text-black"}`} />}
            classNames={{
              inputWrapper: `bg-white backdrop-blur-sm border-2 ${errors.email ? "border-red-300" : "border-black"}`,
              input: `text-black placeholder-${errors.email ? "text-red-300" : "text-black"}`,
              errorMessage: "text-red-300 text-sm text-center",
            }}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label
          className={`${errors.password ? "text-red-300" : "text-black"} font-medium mb-2`}
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <Input
            {...register("password")}
            type={isPassword ? "password" : "text"}
            name="password"
            placeholder="**********"
            startContent={<FiLock className={`text-xl ${errors.password ? "text-red-300" : "text-black"}`} />}
            endContent={
              isPassword ? (
                <FiEye className="text-xl text-black cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
              ) : (
                <FiEyeOff className="text-xl text-black cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
              )
            }
            classNames={{
              inputWrapper: `bg-white backdrop-blur-sm border-2 ${errors.password ? "border-red-300" : "border-black"}`,
              input: `text-black placeholder-${errors.password ? "text-red-300" : "text-black"}`,
              errorMessage: "text-red-300 text-sm text-center",
            }}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-6 hover:from-cyan-600 hover:to-purple-700 transition-all"
        disabled={loading}
        type="submit"
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      {/* Remember me */}
      <Checkbox
        color="primary"
        isSelected={authState.remember}
        onValueChange={(value) => {
          if (value) {
            dispatch(setAuth({ email, password, remember: true }));
          } else {
            dispatch(clearAuth());
          }
        }}
      >
        Remember Me
      </Checkbox>
    </form>
  );
}
