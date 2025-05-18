import Providers from "@/components/providers";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/signin")
    }
    return (<Providers>
        {children}
    </Providers>
    )
}       