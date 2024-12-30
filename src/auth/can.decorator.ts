// src/auth/can.decorator.ts
import { PolicyHandler, PolicyHandlerCallback } from './policy-handler.interface';
import { CheckPolicies } from './check-policies.decorator';

export function Can(action: string, subject: any): MethodDecorator {
  const policyHandler: PolicyHandler = {
    handle: (ability) => ability.can(action, subject),
  };
  return CheckPolicies(policyHandler);
}
