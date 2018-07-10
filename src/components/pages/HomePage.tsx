import { inject, observer } from "mobx-react";
import * as React from "react";
import Page from "~/components/layouts/Page";
import Button from "~/components/ui/Button";
import ButtonLink from "~/components/ui/ButtonLink";
import Heading from "~/components/ui/Heading";
import Icon from "~/components/ui/Icon";
import Image from "~/components/ui/Image";
import Paragraph from "~/components/ui/Paragraph";
import Section from "~/components/ui/Section";
import { RootStore } from "~/store";

interface IHomePageProps {
  title: string;
}

@inject("store")
@observer
export default class HomePage extends React.Component<IHomePageProps> {
  store: RootStore = (this.props as any).store;

  login = () => {
    this.store.user.login({ email: "fake@example.com", password: "xxxxx" });
  };

  logout = () => {
    this.store.user.logout();
  };

  render() {
    const { title } = this.props;

    return (
      <Page>
        <Heading mb={24}>{title}</Heading>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Paragraph
          </Heading>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Image
          </Heading>
          <Image
            src="~/assets/img/doseisan.png"
            width={28}
            height={28}
            alt="Mr. Saturn"
          />
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Icon
          </Heading>
          <Icon src="~/assets/icons/heart.svg" fill="pink300" />
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Button
          </Heading>
          <Button>Normal</Button>
          <Button disabled ml={8}>
            Disabled
          </Button>
          <ButtonLink href="/cat/1" ml={8}>
            Anchor
          </ButtonLink>
          <Button ml={8}>
            <Icon src="~/assets/icons/star.svg" mr={4} />With icon
          </Button>
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Authentication
          </Heading>
          <Paragraph mb={16}>
            isLoggedIn: {this.store.user.isLoggedIn.toString()}
          </Paragraph>
          <Button onClick={this.login}>Login</Button>
          <Button ml={8} onClick={this.logout}>
            Logout
          </Button>
        </Section>
      </Page>
    );
  }
}
