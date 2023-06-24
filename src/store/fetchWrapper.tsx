type RejectWithValueType = (error: unknown) => object

export async function fetchWrapper(
  url: string,
  method: string,
  reject: RejectWithValueType,
  body: unknown = undefined,
  saveAuth: { email: string; password: string } | boolean = false
) {
  try {
    const token = localStorage.getItem('token')
    const responce = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    if (saveAuth) {
      return [outputData, saveAuth]
    }
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return reject(err.message.toString())
    }
  }
  return null
}
