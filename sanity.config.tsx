import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { buildLegacyTheme } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { schemaTypes } from "./sanity/schemas";
import { StudioGuidePane } from "./sanity/components/StudioGuidePane";
import { deleteWithCleanupAction } from "./sanity/actions/deleteWithCleanup";

const TAXONOMY_TYPES = ["city", "propertyCategory", "propertyType"];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const asreTheme = buildLegacyTheme({
  "--black": "#1c1c1c",
  "--white": "#ffffff",
  "--brand-primary": "#1c1c1c",
  "--default-button-color": "#1c1c1c",
  "--default-button-primary-color": "#1c1c1c",
  "--state-info-color": "#1c1c1c",
  "--main-navigation-color": "#1c1c1c",
  "--main-navigation-color--inverted": "#ffffff",
  "--focus-color": "#1c1c1c",
  "--font-family-base":
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "--font-family-monospace":
    "ui-monospace, SFMono-Regular, Menlo, monospace",
});

function AsreLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src="/ali-sons-real-estate-logo.png"
        alt="Ali & Sons Real Estate"
        style={{ height: 28, width: 28, objectFit: "contain" }}
      />
      <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "0.02em" }}>
        Ali &amp; Sons
      </span>
    </div>
  );
}

export default defineConfig({
  name: "asre-studio",
  title: "Ali & Sons Real Estate — Content",
  projectId,
  dataset,
  basePath: "/studio",
  theme: asreTheme,
  icon: () => (
    <img
      src="/ali-sons-real-estate-logo.png"
      alt=""
      style={{ height: "100%", width: "100%", objectFit: "contain" }}
    />
  ),
  studio: {
    components: {
      logo: AsreLogo,
    },
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Quick Guide")
              .id("quick-guide")
              .icon(HelpCircleIcon)
              .child(
                S.component(StudioGuidePane).id("quick-guide").title("Quick Guide")
              ),
            S.divider(),
            S.listItem()
              .title("Properties")
              .schemaType("property")
              .child(S.documentTypeList("property").title("Properties")),
            S.divider(),
            S.listItem()
              .title("Cities")
              .schemaType("city")
              .child(S.documentTypeList("city").title("Cities")),
            S.listItem()
              .title("Property Categories")
              .schemaType("propertyCategory")
              .child(
                S.documentTypeList("propertyCategory").title("Property Categories")
              ),
            S.listItem()
              .title("Property Types")
              .schemaType("propertyType")
              .child(S.documentTypeList("propertyType").title("Property Types")),
            S.divider(),
            S.listItem()
              .title("Site Content")
              .schemaType("siteContent")
              .child(
                S.document().schemaType("siteContent").documentId("siteContent")
              ),
            S.listItem()
              .title("Business Centre")
              .schemaType("businessCentre")
              .child(
                S.document()
                  .schemaType("businessCentre")
                  .documentId("businessCentre")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      TAXONOMY_TYPES.includes(context.schemaType)
        ? prev.map((action) =>
            action.action === "delete" ? deleteWithCleanupAction : action
          )
        : prev,
  },
});
