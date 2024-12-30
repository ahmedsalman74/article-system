// src/auth/ability.factory.ts
import {
    PureAbility,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity';

export type Subjects =
    | InferSubjects<typeof User | typeof Article | typeof Comment | typeof Like>
    | 'all';

export type AppAbility = PureAbility<[string, Subjects]>;

@Injectable()
export class AbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<
            PureAbility<[string, Subjects]>
        >(PureAbility as AbilityClass<AppAbility>);


        if (user) {
            // All authenticated users can read all resources
            can('read', 'all');

            // Users can create articles
            can('create', Article);

            // Users can update/delete their own articles
            can(['update', 'delete'], Article, { author: { id: user.id } });

            // Users can create comments
            can('create', Comment);

            // Users can update/delete their own comments
            can(['update', 'delete'], Comment, { author: { id: user.id } });

            // Users can like articles
            can('like', Article);

            // Users can undo their own likes
            can('undo-like', Article, { likes: { user: { id: user.id } } });
        } else {
            // Guests can only read articles
            can('read', 'all');
        }

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
