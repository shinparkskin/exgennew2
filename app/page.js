import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";
import axios from "axios";
import HomeNotification from "./components/HomeNotification";
import HomeWeeklyNews from "./components/HomeWeeklyNews";
import HomeBoast from "./components/HomeBoast";
import HomeRealReview from "./components/HomeRealReview";
import HomeYoutube from "./components/HomeYoutube";
export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <div class="flex-1">
        <div class="lg:max-w-[680px] w-full">
          <HomeNotification></HomeNotification>
          <HomeWeeklyNews></HomeWeeklyNews>
          <HomeBoast></HomeBoast>
          <HomeRealReview></HomeRealReview>
          <HomeYoutube></HomeYoutube>
        </div>
      </div>
    </>
  );
}
