import { OnAnswerCommentCreate } from '@/domain/notification/application/subscribers/on-answer-comment-create'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { OnQuestionCommentCreate } from '@/domain/notification/application/subscribers/on-question-comment-create'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    OnAnswerCommentCreate,
    OnQuestionCommentCreate,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
