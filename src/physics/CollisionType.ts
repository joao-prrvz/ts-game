import type { Enum } from "../core/Enum.js";

export const CollisionTypes = {
    static: 0,
    dynamic: 1,
    transparent : 2
} as const;

export type CollisionType = Enum<typeof CollisionTypes>;