import * as React from "react";
import Page from "~/components/layouts/Page";
import ExampleForm from "~/components/modules/ExampleForm";
import Button from "~/components/ui/Button";
import ButtonLink from "~/components/ui/ButtonLink";
import Heading from "~/components/ui/Heading";
import Icon from "~/components/ui/Icon";
import Image from "~/components/ui/Image";
import Modal from "~/components/ui/Modal";
import Paragraph from "~/components/ui/Paragraph";
import Section from "~/components/ui/Section";

interface IHomePageProps {
  title: string;
}

interface IHomePageState {
  isModalShown: boolean;
}

export default class HomePage extends React.Component<
  IHomePageProps,
  IHomePageState
> {
  state = {
    isModalShown: false
  };

  openModal = () => {
    this.setState({ isModalShown: true });
  };

  closeModal = () => {
    this.setState({ isModalShown: false });
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
          <Button disabled ml={12}>
            Disabled
          </Button>
          <ButtonLink href="/cat/1" ml={12}>
            Anchor
          </ButtonLink>
          <Button ml={12}>
            <Icon src="~/assets/icons/star.svg" mr={4} />With icon
          </Button>
          <Button block mt={12}>
            Block
          </Button>
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Modal
          </Heading>
          <Button onClick={this.openModal}>Open</Button>
          {this.state.isModalShown && (
            <Modal padded onRequestClose={this.closeModal}>
              <Paragraph mb={16}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph>
              <Button onClick={this.closeModal}>Close</Button>
              <Button ml={12}>OK</Button>
            </Modal>
          )}
        </Section>

        <Section mb={24}>
          <Heading fz={18} mb={16}>
            Form with auto save
          </Heading>
          <ExampleForm />
        </Section>
      </Page>
    );
  }
}
