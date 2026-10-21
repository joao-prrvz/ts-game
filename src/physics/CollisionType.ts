import type { Enum } from "../core/Enum.js";

export const CollisionTypes = {
    static: "static",
    dynamic: "dynamic",
    transparent : "transparent"
} as const;

export type CollisionType = Enum<typeof CollisionTypes>;