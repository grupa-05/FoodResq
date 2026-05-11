export default async function CustomPath()
{
    await new Promise(resolve => setTimeout(resolve, 3000));
    //throw new Error("test error");
    return <div> Custom Path</div>
}
