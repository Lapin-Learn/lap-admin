import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/questions')({
  component: () => <div>Hello /_authenticated/question!</div>,
})
