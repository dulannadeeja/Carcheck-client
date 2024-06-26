import { object,z,string } from "zod";
import { BusinessVerificationDocType, IdentityVerificationDocType } from "../../auth";


export const sellerDocsSchema = object({
        identityDoc: string({
            required_error: 'please upload your identity document'
        }),
        businessDoc: string({
            required_error: 'please upload your business document'
        }),
        identityDocType: z.nativeEnum(IdentityVerificationDocType),
        businessDocType: z.nativeEnum(BusinessVerificationDocType)
})

export type SellerDocsInput = z.infer<typeof sellerDocsSchema>;