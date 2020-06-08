import AWS from 'aws-sdk'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const ddb = new AWS.DynamoDB.DocumentClient()

interface TodoItem {
    todoId: string
    task: string
    done: boolean
}

async function getTodos(todoId: string, event: APIGatewayProxyEvent): Promise<TodoItem[]> {
    let params = {
        TableName: process.env.DYNAMODB_TABLE!,
        Key: {
            todoId: event.pathParameters!.todoId
        }
    }

    let items = await ddb.query(params).promise()
    console.log('List items: ', todoId, items)
    return items.Items as unknown as TodoItem[]
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters ? event.pathParameters.todoId : ''
    const items = await getTodos(todoId, event)

    if (!todoId) {
        const error = {
            statusCode: 501,
            message: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todo item'
        }
        return error

    } else {
        const success = {
            statusCode: 200,
            body: JSON.stringify(items)
        }
        return success
    }
}