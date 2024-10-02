"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import liff from "@line/liff";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiffList() {
  return (
    <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"}>
      <LiffProfileCard />
      <LiffOSInfo />
      <LiffContext />
      <LiffAuthCard />
      <LiffFriendshipCard />
      <LiffSendMessageCard />
    </div>
  );
}

export function LiffOSInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Liff & Your Info</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>OS is: {liff.getOS()}</CardDescription>
        <CardDescription>Lang is: {liff.getAppLanguage()}</CardDescription>
        <CardDescription>
          Current liff version is: {liff.getVersion()}
        </CardDescription>
        <CardDescription>
          User line version is: {liff.getLineVersion() ?? "NOT LINE"}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function LiffContext() {
  const context = liff.getContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your In-App Browser</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          1-on-1 chat id: {context?.utouId ?? "Not Found"}
        </CardDescription>
        <CardDescription>
          Is running in LIFF browser?: {String(liff.isInClient())}
        </CardDescription>
        <CardDescription>
          Is Liff app logged in?: {String(liff.isLoggedIn())}
        </CardDescription>
        <CardDescription>
          Liff scope:{" "}
          {context?.scope.map((val) => (
            <Badge variant={"outline"}>{val}</Badge>
          ))}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function LiffAuthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liff Auth</CardTitle>
        <CardDescription>
          Difference between <code className={"bg-zinc-200"}>Access Token</code>{" "}
          and <code className={"bg-zinc-200"}>Id Token</code>
          <button
            onClick={() => {
              liff.openWindow({
                url: "https://developers.line.biz/en/docs/liff/using-user-profile/#sending-id-token",
                external: true,
              });
            }}
          >
            <Button variant={"link"} className={"underline underline-offset-2"}>
              See More <ChevronRightIcon className={"ml-2 size-4"} />
            </Button>
          </button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Access-Token Info: {String(liff.getAccessToken())}
        </CardDescription>
        <CardDescription>
          ID-Token Info: {String(liff.getIDToken())}
        </CardDescription>
        <CardDescription>
          Decoded ID-Token Info: {String(liff.getDecodedIDToken())}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          disabled={liff.isLoggedIn()}
          onClick={() => {
            liff.login();
          }}
        >
          {liff.isLoggedIn() ? "Already LoggedIn" : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LiffProfileCard() {
  const [profile, setProfile] = useState<{
    displayName: string;
    userId: string;
    pictureUrl?: string;
    statusMessage?: string;
  } | null>(null);

  async function fetchUserInfo() {
    const profile = await liff.getProfile();
    setProfile(profile);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Card className={"sm:col-span-2"}>
      <CardHeader>
        <CardTitle>User Profile Info</CardTitle>
      </CardHeader>
      <CardContent>
        <Avatar>
          <img
            src={profile?.pictureUrl}
            alt={"picture"}
            width={32}
            height={32}
          />
        </Avatar>
        <CardDescription>
          User ID: {profile?.userId ?? "Not Found"}
        </CardDescription>
        <CardDescription>
          User Name: {profile?.displayName ?? "Not Found"}
        </CardDescription>
        <CardDescription>
          User StatusMessage: {profile?.statusMessage ?? "Not Found"}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function LiffFriendshipCard() {
  const [friendship, setFriendship] = useState<{
    friendFlag: boolean;
  } | null>(null);

  async function fetchFriendship() {
    const friendship = await liff.getFriendship();
    setFriendship(friendship);
  }

  useEffect(() => {
    fetchFriendship();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friendship Info</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Is Friend: {String(friendship?.friendFlag ?? false)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function LiffSendMessageCard() {
  const handleBaiscTextMessage = async () => {
    await liff
      .sendMessages([
        {
          type: "text",
          text: "Hello, World!",
        },
      ])
      .then(() => {
        console.log("message sent");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleRichTextMessage = async () => {
    await liff.sendMessages([
      {
        type: "flex",
        altText: "this is a flex message",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              { type: "text", text: "hello" },
              { type: "text", text: "world" },
            ],
          },
        },
      },
    ]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Messages</CardTitle>
        <CardDescription>
          Send message on behalf of user side to chat
        </CardDescription>
      </CardHeader>
      <CardFooter className={"flex items-center gap-2"}>
        <Button variant={"secondary"} onClick={handleBaiscTextMessage}>
          Test Basic Text
        </Button>
        <Button onClick={handleRichTextMessage}>Test Flex Message</Button>
      </CardFooter>
    </Card>
  );
}
