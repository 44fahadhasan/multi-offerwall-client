import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  LinkedinIcon,
  MessageCircleIcon,
  VideoIcon,
  YoutubeIcon,
} from "lucide-react";

const data = [
  {
    title: "Email",
    value: "mail@efferd.com",
  },
  {
    title: "Phone",
    value: "+1 (234) 567-890",
  },
  {
    title: "Office",
    value: "123 Innovation Drive,\nSan Francisco, CA 94107",
  },
];

const socialLinks = [
  {
    icon: <LinkedinIcon />,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: <YoutubeIcon />,
    href: "#",
    label: "YouTube",
  },
  { icon: <XIcon />, href: "#", label: "X" },
  {
    icon: <FacebookIcon />,
    href: "#",
    label: "Facebook",
  },
];

export default function Contact() {
  const cards = [
    {
      title: "Chat with us",
      description: "Speak to our friendly team via live chat.",
      icon: <MessageCircleIcon />,
      children: <Button variant="outline">Start Live Chat</Button>,
    },
    {
      title: "Try Efferd",
      description: "See how Efferd can transform your product's UI.",
      icon: <VideoIcon />,
      children: <Button variant="outline">Book a demo</Button>,
    },
  ];
  return (
    <div className="relative mx-auto min-h-screen w-full max-w-4xl border-x">
      <div className="flex flex-col gap-2 p-6 md:p-8 lg:p-12">
        <h1 className="font-semibold text-xl md:text-2xl">Let's Talk</h1>
        <p className="text-muted-foreground text-sm">
          Need support or have a question about Efferd? We're here to help.
        </p>
      </div>
      <FullWidthDivider />
      <div className="mt-px grid gap-px bg-border md:grid-cols-2">
        {cards.map((item) => (
          <div
            className="relative flex flex-col items-start bg-background p-6 md:p-8 lg:p-12"
            key={item.title}
          >
            <div className="mb-2 flex w-full items-center justify-between gap-2">
              <h2 className="font-medium text-lg md:text-xl">{item.title}</h2>
              <div className="[&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:md:size-6">
                {item.icon}
              </div>
            </div>
            <p className="mb-6 text-muted-foreground text-sm md:text-base">
              {item.description}
            </p>
            {item.children}
          </div>
        ))}
      </div>
      <FullWidthDivider />
      <div
        className={cn(
          "grid gap-px bg-border *:bg-background md:grid-cols-2",
          "*:p-6 *:md:p-8 *:lg:p-12",
        )}
      >
        <div className="space-y-10 *:space-y-1.5">
          <DashedLine />
          {data.map((item) => (
            <div key={item.title}>
              <h3 className="text-muted-foreground text-sm">{item.title}</h3>
              <p className="whitespace-pre-line font-medium text-foreground text-sm">
                {item.value}
              </p>
            </div>
          ))}
          <div>
            <h3 className="text-muted-foreground text-sm">Socials</h3>
            <div className="flex">
              {socialLinks.map(({ icon, href, label }) => (
                <Button asChild key={label} size="icon-lg" variant="ghost">
                  <a href={href}>
                    {icon}
                    <span className="sr-only">{label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <DashedLine className="hidden md:block" />
          <div className="mb-8 flex flex-col gap-1.5">
            <h2 className="font-medium text-xl">Send a message</h2>
            <p className="text-muted-foreground text-sm">
              Fill out the form below and our team will get back to you shortly.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="w-full">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="first-name">First name</FieldLabel>
            <Input autoComplete="off" id="first-name" placeholder="John" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last name</FieldLabel>
            <Input autoComplete="off" id="last-name" placeholder="Doe" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Work Email</FieldLabel>
          <Input
            autoComplete="off"
            id="email"
            placeholder="johndoe@example.com"
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">
            Phone <span className="text-muted-foreground">(Optional)</span>
          </FieldLabel>
          <Input
            autoComplete="off"
            id="phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="company-website">Company Website</FieldLabel>
            <Input
              autoComplete="off"
              id="company-website"
              placeholder="https://example.com"
              type="url"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="company-size">Company Size</FieldLabel>
            <Select>
              <SelectTrigger id="company-size">
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100">0-100</SelectItem>
                <SelectItem value="100-500">100-500</SelectItem>
                <SelectItem value="500-1000">500-1000</SelectItem>
                <SelectItem value="1000-5000">1000-5000</SelectItem>
                <SelectItem value="5000+">5000+</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="message">How can we help?</FieldLabel>
          <Textarea
            autoComplete="off"
            id="message"
            placeholder="Your message"
          />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="consent" />
          <FieldLabel
            className="font-normal text-muted-foreground text-sm leading-snug"
            htmlFor="consent"
          >
            I agree to the{" "}
            <a className="text-primary hover:underline" href="#">
              Privacy Policy
            </a>
            .
          </FieldLabel>
        </Field>
      </FieldGroup>

      <Button className="mt-5 w-full" type="submit">
        Submit
      </Button>
    </form>
  );
}

function DashedLine({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute -inset-y-10 border-l border-dashed",
        "-translate-x-2.5 md:-translate-x-4",
        className,
      )}
      {...props}
    />
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}
