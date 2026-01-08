"use client";;
import { Provider } from "react-redux";
import { store } from "@/redux/store";


export function ReduxProviders({ children }: {children: any}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
