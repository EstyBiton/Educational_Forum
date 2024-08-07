import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../data/redux/store";
import { selectAuth } from "../../data/redux/auth/auth.selectors";
import { PATHS } from "../../routes/paths";

type GuestGuardProps = {
    children: ReactNode;
}

export default function GuestGuard({ children}:GuestGuardProps ) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(selectAuth);

        if (!isAuthenticated) {
            navigate(PATHS.LogIn);
        }


    return {children};
};
