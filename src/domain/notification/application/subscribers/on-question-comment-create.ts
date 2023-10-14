import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { QuestionCommentCreatedEvent } from '@/domain/forum/enterprise/events/question-comment-created-event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnQuestionCommentCreate implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentNotification.bind(this),
      QuestionCommentCreatedEvent.name,
    )
  }

  private async sendNewQuestionCommentNotification({
    questionComment,
  }: QuestionCommentCreatedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: question.excerpt,
      })
    }
  }
}
