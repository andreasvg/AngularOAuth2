import { SimpleClaim } from "./simple-claim";
import { UserProfile } from "./user-profile";

export class AuthContext {
  claims: SimpleClaim[];
  userProfile: UserProfile;
}
