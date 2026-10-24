import { PhoneFrame } from "@/components/preview/PhoneFrame";
import { ProfilePreview } from "@/components/preview/ProfilePreview";
import { DEFAULT_PROFILE } from "@/constants/defaultProfile";

const App = () => (
  <main className="flex min-h-screen justify-center p-6">
    <PhoneFrame theme="light">
      <ProfilePreview profile={DEFAULT_PROFILE} locale="pt-BR" />
    </PhoneFrame>
  </main>
);

export default App;
