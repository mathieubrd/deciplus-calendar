import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DeciplusCalendar from '../lib/deciplus-calendar-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DeciplusCalendar.DeciplusCalendarStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
