import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

type Props = {
  maxDonatorsShown: number;
};

function Donation(props: Props) {
  const { maxDonatorsShown } = props;

  const widgetUrlPartial = `https://opencollective.com/rsschool/backers.svg?avatarHeight=36&button=false&width=300&limit=${maxDonatorsShown}`;

  return (
    <>
      <h3 className="mb-1 font-medium">Thank you for your support!</h3>
      <h4 className="mb-1 text-sm font-medium">Top {maxDonatorsShown} donators:</h4>
      <p style={{ overflow: "hidden" }}>
        <object
          type="image/svg+xml"
          data={widgetUrlPartial}
        />
      </p>
      <p>
        <Button
          variant="outline"
          asChild
          className="mt-4 border border-gray-300 hover:border-blue-500 hover:text-blue-500 hover:bg-white"
        >
          <Link
            href="https://opencollective.com/rsschool#section-contribute"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <Heart
              color="#eb2f96"
              size="16"
            />
            Make a donation
          </Link>
        </Button>
      </p>
    </>
  );
}

export { Donation };
