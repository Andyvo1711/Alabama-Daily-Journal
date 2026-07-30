import UtilityBar from "@/components/UtilityBar";
import SiteMasthead from "@/components/SiteMasthead";
import PrimaryNavigation from "@/components/PrimaryNavigation";
import MobileNavigation from "@/components/MobileNavigation";

export default function SiteHeader() {
  return (
    <header>
      <UtilityBar />
      <SiteMasthead />
      <PrimaryNavigation />
      <MobileNavigation />
    </header>
  );
}
