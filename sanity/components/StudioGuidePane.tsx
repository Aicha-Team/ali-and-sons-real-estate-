import { Box, Card, Flex, Heading, Stack, Text } from "@sanity/ui";

const SECTIONS: { title: string; steps: string[] }[] = [
  {
    title: "Adding a property",
    steps: [
      'Click "Properties" on the left, then the compose (pencil) button to create a new listing.',
      "Fill in the Title, City, Category, Type, Price and add photos — that's all that's required.",
      'Click "Publish" at the bottom to make it live on the website within a minute.',
    ],
  },
  {
    title: "Cities, Categories & Types",
    steps: [
      "These are the options that appear in the website's search and filter dropdowns.",
      'To add a new one (e.g. a new city), open "Cities", "Property Categories" or "Property Types" and create it there.',
      "It becomes selectable on properties and visible in the website filters automatically.",
    ],
  },
  {
    title: "Editing website text & images",
    steps: [
      '"Site Content" holds the homepage hero, about texts and stats.',
      '"Business Centre" holds the Business Centre page content.',
      "Edit, then Publish — changes appear on the site within a minute.",
    ],
  },
  {
    title: "Good to know",
    steps: [
      "Nothing goes live until you press Publish — drafts are saved automatically as you type.",
      "The property's web address (URL) is generated automatically from the Title. You never need to manage it.",
      "Mark a property as \"Featured\" to show it on the homepage showcase.",
    ],
  },
];

export function StudioGuidePane() {
  return (
    <Box padding={5} style={{ maxWidth: 680 }}>
      <Stack space={6}>
        <Stack space={3}>
          <Heading as="h1" size={3}>
            Welcome — quick guide
          </Heading>
          <Text size={2} muted>
            Everything you need to manage the Ali &amp; Sons Real Estate website,
            in a few simple steps.
          </Text>
        </Stack>

        {SECTIONS.map((section) => (
          <Card key={section.title} padding={4} radius={3} shadow={1} tone="transparent" border>
            <Stack space={4}>
              <Heading as="h2" size={1}>
                {section.title}
              </Heading>
              <Stack space={3}>
                {section.steps.map((step, i) => (
                  <Flex key={i} gap={3} align="flex-start">
                    <Card
                      tone="primary"
                      radius={6}
                      style={{
                        width: 22,
                        height: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Text size={0} weight="semibold">
                        {i + 1}
                      </Text>
                    </Card>
                    <Text size={1} muted style={{ lineHeight: 1.6 }}>
                      {step}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
