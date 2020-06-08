import AWS from 'aws-sdk'

AWS.config.setPromisesDependency(require('bluebird'))

const ddb = new AWS.DynamoDB.DocumentClient()

interface GetItemParams {
    TableName: string
    Key: {
        [key: string]: string
    }
}

interface ScanItemsParams {
    TableName: string
    FilterExpression?: string
    ExpressionAttributeName?: {
        [key: string]: string
    }
    ExpressionAttributeValues?: {
        [key: string]: string | number | undefined | null
    }
}

interface UpdateItemParams {
    TableName: string
    Key: {
        [key: string]: string
    }
    UpdateExpression: string
    ExpressionAttributeValues: {
        [key: string]: string | number | undefined | null
    }
    ReturnValues?: string
}

interface DeleteItemParams {
    TableName: string
    Key: {
        [key: string]: string
    }
    ReturnValues?: string
}

/**
 * collect all fields in a JSON object into a DynamoDB expression
 */
export const buildExpression = (body: any) => {
    return Object.keys(body)
        .map((key: string) => `${key} = :${key}`)
        .join(", ")
}

export const buildAttributes = (body: any) => {
    return Object.fromEntries(
        Object.entries(body).map(([key, value]) => [
            `:${key}`,
            typeof value === "string" || typeof value === "number"
                ? value
                : JSON.stringify(value),
        ])
    )
}

export const getItem = async (params: GetItemParams): Promise<AWS.DynamoDB.GetItemOutput> => {
    const query = {
        ...params
    }

    return new Promise((resolve, reject) => {
        ddb.get(query, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export const scanItems = async (params: ScanItemsParams): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> => {
    const query = {
        ...params,
    }

    return new Promise((resolve, reject) => {
        ddb.scan(query, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export const updateItem = async (params: UpdateItemParams): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> => {
    const query = {
        ...params,
    }

    return new Promise((resolve, reject) => {
        ddb.update(query, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export const deleteItem = async (params: DeleteItemParams): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> => {
    const query = {
        ...params,
    }

    return new Promise((resolve, reject) => {
        ddb.delete(query, (err, result) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}