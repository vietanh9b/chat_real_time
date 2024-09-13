import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Home({ auth }) {
    return (
        <>Messages</>
    );
}
Home.layout=(page)=>{
    return (
    <AuthenticatedLayout user={page.props.auth.user}>
        <ChatLayout children={page}></ChatLayout>
    </AuthenticatedLayout>
    );
}
export default Home;