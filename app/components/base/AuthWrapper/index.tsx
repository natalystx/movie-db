"use client";

import { useAuth } from "@/hooks/useAuth";
import React from "react";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  useAuth();
  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthWrapper;
