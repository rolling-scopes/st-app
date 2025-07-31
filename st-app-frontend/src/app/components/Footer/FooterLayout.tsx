import * as React from "react";

import { Feedback } from "./Feedback";
import { Help } from "./Help";
import { SocialNetworks } from "./SocialNetworks";
import { Donation } from "./Donation";

const maxDonatorsShown = 21;

class FooterLayout extends React.Component<any, any> {
  getYear() {
    const date = new Date();
    return date.getFullYear();
  }

  render() {
    return (
      <footer className="bg-muted p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col justify-between">
            <Help />
            <SocialNetworks />
          </div>
          <div className="space-y-4">
            <Feedback />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <Donation maxDonatorsShown={maxDonatorsShown} />
            <small className="text-xs mt-6">
              &copy; The Rolling Scopes {this.getYear()}
            </small>
          </div>
        </div>
      </footer>
    );
  }
}

export { FooterLayout };
