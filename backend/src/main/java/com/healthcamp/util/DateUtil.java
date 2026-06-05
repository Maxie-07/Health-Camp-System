package com.healthcamp.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;

public final class DateUtil {

    private DateUtil() {
    }

    public static Instant startOfDayUtc(LocalDate date) {
        return date.atStartOfDay(ZoneOffset.UTC).toInstant();
    }

    public static Instant endOfDayUtc(LocalDate date) {
        return date.plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();
    }

    public static Instant startOfWeekUtc(LocalDate date) {
        return startOfDayUtc(date.minusDays(date.getDayOfWeek().getValue() - 1L));
    }
}
