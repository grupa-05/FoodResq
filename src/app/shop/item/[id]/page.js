export default async function ShopItem({params})
{
    const {id}= await params

    return <div>My Shop Item ID: {id}</div>
}